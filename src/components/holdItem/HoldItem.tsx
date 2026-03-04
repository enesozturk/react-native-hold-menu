import {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef
} from 'react';

//#region reanimated & gesture handler
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    measure,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
//#endregion

//#region dependencies
import * as Haptics from 'expo-haptics';
//#endregion

//#region utils & types
import {
    CONTEXT_MENU_STATE,
    HOLD_ITEM_SCALE_DOWN_DURATION,
    HOLD_ITEM_SCALE_DOWN_VALUE,
    HOLD_ITEM_TRANSFORM_DURATION,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from '../../constants';
import { useDeviceOrientation } from '../../hooks';
import {
    TransformOriginAnchorPosition,
    calculateMenuHeight,
    getTransformOrigin,
} from '../../utils/calculations';

import { useInternal } from '../../hooks';
import styleGuide from '../../styleGuide';
import type { HoldItemProps } from './types';
//#endregion

let holdItemId = 0;

const getNextHoldItemId = () => {
  holdItemId += 1;
  return `hold-item-${holdItemId}`;
};

/** Logs worklet errors to Metro/console when called via scheduleOnRN. */
function logWorkletError(label: string, message: string) {
  console.error('[react-native-hold-menu]', label, message);
}

const HoldItemComponent = ({
  items,
  bottom,
  containerStyles,
  disableMove,
  menuAnchorPosition,
  activateOn,
  hapticFeedback,
  actionParams,
  closeOnTap,
  longPressMinDurationMs = 150,
  children,
}: HoldItemProps) => {
  //#region hooks
  const {
    state,
    activeItemId,
    menuProps,
    setMenuData,
    safeAreaInsets,
    setActiveOverlay,
    clearActiveOverlay,
  } = useInternal();
  const deviceOrientation = useDeviceOrientation();
  //#endregion

  //#region variables
  const isActive = useSharedValue(false);
  const isAnimationStarted = useSharedValue(false);

  const itemRectY = useSharedValue<number>(0);
  const itemRectX = useSharedValue<number>(0);
  const itemRectWidth = useSharedValue<number>(0);
  const itemRectHeight = useSharedValue<number>(0);
  const itemScale = useSharedValue<number>(1);
  const transformValue = useSharedValue<number>(0);

  const transformOrigin = useSharedValue<TransformOriginAnchorPosition>(
    menuAnchorPosition || 'top-right'
  );
  const didMeasureLayout = useSharedValue(false);
  const overlayId = useRef(getNextHoldItemId()).current;
  const latestItemsRef = useRef(items);
  const latestActionParamsRef = useRef<Record<string, unknown[]>>(
    actionParams || {}
  );

  latestItemsRef.current = items;
  latestActionParamsRef.current = actionParams || {};

  const menuHeight = useMemo(() => {
    const itemsWithSeparator = items.filter(item => item.withSeparator);
    return calculateMenuHeight(items.length, itemsWithSeparator.length);
  }, [items]);
  const itemCount = items.length;
  const separatorCount = useMemo(
    () => items.filter(item => item.withSeparator).length,
    [items]
  );

  const isHold = !activateOn || activateOn === 'hold';
  //#endregion

  //#region refs
  const containerRef = useAnimatedRef<Animated.View>();
  //#endregion



  const triggerHapticOnRN = useCallback(() => {
    const style = !hapticFeedback ? 'Medium' : hapticFeedback;
    switch (style) {
      case 'Selection':
        Haptics.selectionAsync();
        break;
      case 'Light':
      case 'Medium':
      case 'Heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style]);
        break;
      case 'Success':
      case 'Warning':
      case 'Error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[style]);
        break;
      default:
    }
  }, [hapticFeedback]);

  const openOverlayOnRN = useCallback(() => {
    setMenuData(latestItemsRef.current, latestActionParamsRef.current);
    setActiveOverlay({
      id: overlayId,
      itemNode: children,
      itemScale,
      isActive,
      itemRectY,
      itemRectX,
      itemRectWidth,
      itemRectHeight,
      disableMove,
      closeOnTap,
    });
  }, [
    children, disableMove, closeOnTap, isActive, itemRectHeight, itemRectWidth,
    itemRectX, itemRectY, itemScale, overlayId, setActiveOverlay, setMenuData
  ]);



  //#region worklet functions
  const activateAnimation = () => {
    'worklet';
    try {
      if (!didMeasureLayout.value) {
        const measured = measure(containerRef);
        if (measured == null) {
          scheduleOnRN(
            logWorkletError,
            'activateAnimation',
            'measure() returned null - element may not be mounted'
          );
          return false;
        }

        itemRectY.value = measured.pageY;
        itemRectX.value = measured.pageX;
        itemRectHeight.value = measured.height;
        itemRectWidth.value = measured.width;

        if (!menuAnchorPosition) {
          const position = getTransformOrigin(
            measured.pageX,
            itemRectWidth.value,
            deviceOrientation === 'portrait' ? WINDOW_WIDTH : WINDOW_HEIGHT,
            bottom
          );
          transformOrigin.value = position;
        }

        didMeasureLayout.value = true;
      }

      return true;
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'activateAnimation',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      return false;
    }
  };

  const calculateTransformValue = () => {
    'worklet';
    try {
      const height =
        deviceOrientation === 'portrait' ? WINDOW_HEIGHT : WINDOW_WIDTH;

      const anchor = transformOrigin.value;
      const isAnchorPointTop =
        typeof anchor === 'string' && anchor.includes('top');

      const insetsTop = safeAreaInsets ? safeAreaInsets.top : 0;
      const insetsBottom = safeAreaInsets ? safeAreaInsets.bottom : 0;

      let tY = 0;
      if (!disableMove) {
        if (isAnchorPointTop) {
          const topTransform =
            itemRectY.value +
            itemRectHeight.value +
            menuHeight +
            styleGuide.spacing +
            insetsBottom;

          tY = topTransform > height ? height - topTransform : 0;
        } else {
          const bottomTransform =
            itemRectY.value - menuHeight - insetsTop;
          tY =
            bottomTransform < 0 ? -bottomTransform + styleGuide.spacing * 2 : 0;
        }
      }
      return tY;
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'calculateTransformValue',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      throw e;
    }
  };

  const setMenuProps = () => {
    'worklet';
    try {
      menuProps.value = {
        itemHeight: itemRectHeight.value,
        itemWidth: itemRectWidth.value,
        itemY: itemRectY.value,
        itemX: itemRectX.value,
        anchorPosition: transformOrigin.value,
        menuHeight: menuHeight,
        transformValue: transformValue.value,
        itemCount,
        separatorCount: separatorCount,
      };
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'setMenuProps',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      throw e;
    }
  };

  const scaleBack = () => {
    'worklet';
    itemScale.value = withTiming(1, {
      duration: HOLD_ITEM_TRANSFORM_DURATION / 2,
    });
  };

  const onCompletion = (isFinished?: boolean) => {
    'worklet';
    try {
      const isListValid = itemCount > 0;
      if (isFinished && isListValid && didMeasureLayout.value) {
        activeItemId.value = overlayId;
        isActive.value = true;
        scheduleOnRN(openOverlayOnRN);
        state.value = CONTEXT_MENU_STATE.ACTIVE;
        scaleBack();
        if (hapticFeedback !== 'None') {
          scheduleOnRN(triggerHapticOnRN);
        }
      }

      isAnimationStarted.value = false;
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'onCompletion',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      throw e;
    }
  };

  const scaleHold = () => {
    'worklet';
    itemScale.value = withTiming(
      HOLD_ITEM_SCALE_DOWN_VALUE,
      { duration: HOLD_ITEM_SCALE_DOWN_DURATION },
      onCompletion
    );
  };

  const scaleTap = () => {
    'worklet';
    isAnimationStarted.value = true;

    itemScale.value = withSequence(
      withTiming(HOLD_ITEM_SCALE_DOWN_VALUE, {
        duration: HOLD_ITEM_SCALE_DOWN_DURATION,
      }),
      withTiming(
        1,
        {
          duration: HOLD_ITEM_TRANSFORM_DURATION / 2,
        },
        onCompletion
      )
    );
  };

  /**
   * Prevent restarting the tap/double-tap animation while it is in flight.
   */
  const canCallActivateFunctions = () => {
    'worklet';
    const willActivateWithTap =
      activateOn === 'double-tap' || activateOn === 'tap';

    return (
      (willActivateWithTap && !isAnimationStarted.value) || !willActivateWithTap
    );
  };
  //#endregion

  //#region gesture events
  const mainGesture = useMemo(() => {
    const onStart = () => {
      const animationActivated = activateAnimation();
      
      if (!animationActivated) {
        scheduleOnRN(
          logWorkletError,
          'mainGesture.onStart',
          'activateAnimation failed - menu may not appear correctly'
        );
        return;
      }
      
      if (canCallActivateFunctions()) {
        transformValue.value = calculateTransformValue();
        setMenuProps();

        if (!isActive.value) {
          if (isHold) {
            scaleHold();
          } else {
            scaleTap();
          }
        }
      }
    };

    const onFinalize = () => {
      didMeasureLayout.value = false;
      if (isHold) {
        scaleBack();
      }
    };

    if (activateOn === 'double-tap') {
      return Gesture.Tap()
        .numberOfTaps(2)
        .onStart(onStart)
        .onFinalize(onFinalize);
    }

    if (activateOn === 'tap') {
      return Gesture.Tap().onStart(onStart).onFinalize(onFinalize);
    }

    return Gesture.LongPress()
      .minDuration(longPressMinDurationMs)
      .onStart(onStart)
      .onFinalize(onFinalize);
  }, [activateOn, isHold, longPressMinDurationMs, itemCount, separatorCount]);


  //#endregion

  //#region animated styles
  const animatedContainerStyle = useAnimatedStyle(() => {
    try {
      return {
        opacity: isActive.value ? 0 : withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(1, { duration: 0 })),
        transform: [
          {
            scale: isActive.value
              ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
              : itemScale.value,
          },
        ],
      };
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'animatedContainerStyle',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      throw e;
    }
  });

  const containerStyle = useMemo(
    () => [containerStyles, animatedContainerStyle],
    [animatedContainerStyle, containerStyles]
  );




  //#endregion

  //#region overlay host
  //#endregion

  //#region animated effects
  useAnimatedReaction(
    () => state.value,
    currentState => {
      if (currentState === CONTEXT_MENU_STATE.END) {
        isActive.value = false;
      }
    },
    [state]
  );

  useAnimatedReaction(
    () => activeItemId.value,
    currentActiveItemId => {
      if (currentActiveItemId !== overlayId) {
        isActive.value = false;
      }
    },
    [activeItemId, overlayId]
  );
  //#endregion

  useEffect(
    () => () => {
      clearActiveOverlay(overlayId);
    },
    [clearActiveOverlay, overlayId]
  );



  //#region render
  return (
    <GestureDetector gesture={mainGesture}>
      <Animated.View ref={containerRef} style={containerStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
  //#endregion
};

const HoldItem = memo(HoldItemComponent);

export default HoldItem;
