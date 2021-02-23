import React, { memo, useMemo } from 'react';

import { Portal } from '@gorhom/portal';
import { nanoid } from 'nanoid/non-secure';
import {
  LongPressGestureHandler,
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
import type { IHoldItem } from './types';
import styleGuide from '../../styleGuide';
import { useInternal } from '../../hooks/useInternal';

type Context = { didMeasureLayout: boolean };

const HoldItemChildComponent = ({
  items,
  bottom,
  containerStyles,
  disableMove,
  menuAnchorPosition,
  children,
}: IHoldItem) => {
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

  const menuHeight = useMemo(() => calculateMenuHeight(items.length), [items]);

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
      items: items,
      transformValue: transformValue.value,
    };
  };

  const scaleBack = () => {
    'worklet';
    itemScale.value = withTiming(1, {
      duration: HOLD_ITEM_TRANSFORM_DURATION / 2,
    });
  };

  const longPressGestureEvent = useAnimatedGestureHandler<
    LongPressGestureHandlerGestureEvent,
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
        itemScale.value = withTiming(
          HOLD_ITEM_SCALE_DOWN_VALUE,
          { duration: HOLD_ITEM_SCALE_DOWN_DURATION },
          isFinised => {
            const isListValid = items && items.length > 0;
            if (isFinised && isListValid) {
              state.value = CONTEXT_MENU_STATE.ACTIVE;
              isActive.value = true;
              scaleBack();
            }

            // TODO: Warn user if item list is empty or not given
          }
        );
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;
      scaleBack();
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

  return (
    <>
      <LongPressGestureHandler
        minDurationMs={150}
        onHandlerStateChange={longPressGestureEvent}
      >
        <Animated.View ref={containerRef} style={containerStyle}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>

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

const HoldItemChild = memo(HoldItemChildComponent);

export default HoldItemChild;
