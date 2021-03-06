import React, { memo, useMemo } from 'react';

import { Portal } from '@gorhom/portal';
import { nanoid } from 'nanoid/non-secure';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  TapGestureHandlerGestureEvent,
  LongPressGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  withSequence,
  withSpring,
  useAnimatedReaction,
} from 'react-native-reanimated';

// Utils
import {
  TransformOriginAnchorPosition,
  getTransformOrigin,
  calculateMenuHeight,
} from '../../utils/calculations';
import {
  HOLD_ITEM_TRANSFORM_DURATION,
  HOLD_ITEM_SCALE_DOWN_DURATION,
  HOLD_ITEM_SCALE_DOWN_VALUE,
  SPRING_CONFIGURATION,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  CONTEXT_MENU_STATE,
} from '../../constants';
import { ViewProps } from 'react-native';
import styles from './styles';
import { useDeviceOrientation } from '../../hooks';

// Types
import type { HoldItemProps, GestureHandlerProps } from './types';
import styleGuide from '../../styleGuide';
import { useInternal } from '../../hooks';

type Context = { didMeasureLayout: boolean };

const HoldItemComponent = ({
  items,
  bottom,
  containerStyles,
  disableMove,
  menuAnchorPosition,
  activateOn,
  children,
}: HoldItemProps) => {
  const { state, menuProps } = useInternal();
  const isActive = useSharedValue(false);
  const containerRef = useAnimatedRef<Animated.View>();

  const itemRectY = useSharedValue<number>(0);
  const itemRectX = useSharedValue<number>(0);
  const itemRectWidth = useSharedValue<number>(0);
  const itemRectHeight = useSharedValue<number>(0);
  const itemScale = useSharedValue<number>(1);
  const transformValue = useSharedValue<number>(0);

  const transformOrigin = useSharedValue<TransformOriginAnchorPosition>(
    menuAnchorPosition || 'top-right'
  );

  const deviceOrientation = useDeviceOrientation();
  const key = useMemo(() => `hold-item-${nanoid()}`, []);
  const isHold = useMemo(() => !activateOn || activateOn === 'hold', [
    activateOn,
  ]);
  const menuHeight = useMemo(() => {
    const itemsWithSeperator = items.filter(item => item.withSeperator);
    return calculateMenuHeight(items.length, itemsWithSeperator.length);
  }, [items]);

  const activateAnimation = (ctx: any) => {
    'worklet';
    if (!ctx.didMeasureLayout) {
      const measured = measure(containerRef);

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
    }
  };

  const calculateTransformValue = () => {
    'worklet';

    const height =
      deviceOrientation === 'portrait' ? WINDOW_HEIGHT : WINDOW_WIDTH;

    const isAnchorPointTop = transformOrigin.value.includes('top');

    let tY = 0;
    if (!disableMove) {
      if (isAnchorPointTop) {
        const topTransform =
          itemRectY.value +
          itemRectHeight.value +
          menuHeight +
          styleGuide.spacing * 2;

        tY = topTransform > height ? height - topTransform : 0;
      } else {
        const bototmTransform = itemRectY.value - menuHeight;
        tY =
          bototmTransform < 0 ? -bototmTransform + styleGuide.spacing * 2 : 0;
      }
    }
    return tY;
  };

  const setMenuProps = () => {
    'worklet';

    menuProps.value = {
      itemHeight: itemRectHeight.value,
      itemWidth: itemRectWidth.value,
      itemY: itemRectY.value,
      itemX: itemRectX.value,
      anchorPosition: transformOrigin.value,
      menuHeight: menuHeight,
      items,
      transformValue: transformValue.value,
    };
  };

  const scaleBack = () => {
    'worklet';
    itemScale.value = withTiming(1, {
      duration: HOLD_ITEM_TRANSFORM_DURATION / 2,
    });
  };

  const onCompletion = (isFinised: boolean) => {
    'worklet';
    const isListValid = items && items.length > 0;
    if (isFinised && isListValid) {
      state.value = CONTEXT_MENU_STATE.ACTIVE;
      isActive.value = true;
      scaleBack();
    }

    // TODO: Warn user if item list is empty or not given
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

  const gestureEvent = useAnimatedGestureHandler<
    LongPressGestureHandlerGestureEvent | TapGestureHandlerGestureEvent,
    Context
  >({
    onActive: (_, context) => {
      if (!context.didMeasureLayout) {
        activateAnimation(context);
        transformValue.value = calculateTransformValue();
        setMenuProps();
        context.didMeasureLayout = true;
      }

      if (!isActive.value) {
        if (isHold) {
          scaleHold();
        } else {
          scaleTap();
        }
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;
      if (isHold) {
        scaleBack();
      }
    },
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(1, { duration: 0 }));

    return {
      opacity: isActive.value ? 0 : animateOpacity(),
      transform: [
        {
          scale: isActive.value
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value,
        },
      ],
    };
  });
  const containerStyle = React.useMemo(
    () => [containerStyles, animatedContainerStyle],
    [containerStyles, animatedContainerStyle]
  );

  const animatedPortalStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(0, { duration: 0 }));

    let tY = calculateTransformValue();
    const transformAnimation = () =>
      disableMove
        ? 0
        : isActive.value
        ? withSpring(tY, SPRING_CONFIGURATION)
        : withTiming(-0.1, { duration: HOLD_ITEM_TRANSFORM_DURATION });

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      opacity: isActive.value ? 1 : animateOpacity(),
      transform: [
        {
          translateY: transformAnimation(),
        },
        {
          scale: isActive.value
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value,
        },
      ],
    };
  });
  const portalContainerStyle = useMemo(
    () => [styles.holdItem, animatedPortalStyle],
    [animatedPortalStyle]
  );

  const animatedPortalProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: isActive.value ? 'auto' : 'none',
  }));

  useAnimatedReaction(
    () => state.value,
    _state => {
      if (_state === CONTEXT_MENU_STATE.END) {
        isActive.value = false;
      }
    }
  );

  const GestureHandler = useMemo(() => {
    switch (activateOn) {
      case `double-tap`:
        return ({ children }: GestureHandlerProps) => (
          <TapGestureHandler
            numberOfTaps={2}
            onHandlerStateChange={gestureEvent}
          >
            {children}
          </TapGestureHandler>
        );
      case `tap`:
        return ({ children }: GestureHandlerProps) => (
          <TapGestureHandler
            numberOfTaps={1}
            onHandlerStateChange={gestureEvent}
          >
            {children}
          </TapGestureHandler>
        );
      // default is hold
      default:
        return ({ children }: GestureHandlerProps) => (
          <LongPressGestureHandler
            minDurationMs={150}
            onHandlerStateChange={gestureEvent}
          >
            {children}
          </LongPressGestureHandler>
        );
    }
  }, [activateOn]);

  return (
    <>
      <GestureHandler>
        <Animated.View ref={containerRef} style={containerStyle}>
          {children}
        </Animated.View>
      </GestureHandler>

      <Portal key={key} name={key}>
        <Animated.View
          key={key}
          style={portalContainerStyle}
          animatedProps={animatedPortalProps}
        >
          {children}
        </Animated.View>
      </Portal>
    </>
  );
};

const HoldItem = memo(HoldItemComponent);

export default HoldItem;
