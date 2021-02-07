import React from 'react';

import { Portal } from '@gorhom/portal';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

// Components
import Menu from '../menu';

// Utils
import type { HoldItemChildProps } from './types';
import {
  TransformOriginAnchorPosition,
  getTransformOrigin,
} from '../../utils/calculations';
import {
  HOLD_ITEM_TRANSFORM_DURATION,
  HOLD_ITEM_SCALE_DOWN_DURATION,
  HOLD_ITEM_SCALE_DOWN_VALUE,
} from '../../constants';
import { ViewProps } from 'react-native';

type Context = { didMeasureLayout: boolean };

const HoldItemChildComponent = ({
  id,
  children,
  items,
  isActive,
  menuAnchorPosition,
  theme,
  disableMove,
  styles,
  handleActivate,
}: HoldItemChildProps) => {
  const containerRef = useAnimatedRef<Animated.View>();
  const longPressGestureState = useSharedValue<State>(State.UNDETERMINED);
  const itemRectY = useSharedValue<number>(0);
  const itemRectX = useSharedValue<number>(0);
  const itemRectWidth = useSharedValue<number>(0);
  const itemRectHeight = useSharedValue<number>(0);
  const itemScale = useSharedValue<number>(1);

  const transformOrigin = useSharedValue<TransformOriginAnchorPosition>(
    menuAnchorPosition || 'top-right'
  );

  React.useEffect(() => {
    if (!isActive) {
      longPressGestureState.value = State.END;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const activateAnimation = (ctx: any) => {
    'worklet';
    if (!ctx.didMeasureLayout) {
      const measured = measure(containerRef);
      itemRectY.value = measured.pageY;
      itemRectX.value = measured.pageX;
      itemRectHeight.value = measured.height;
      itemRectWidth.value = measured.width;

      if (!menuAnchorPosition)
        transformOrigin.value = getTransformOrigin(
          measured.pageX,
          itemRectWidth.value
        );
    }
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
    onActive: ({ state }, context) => {
      activateAnimation(context);
      context.didMeasureLayout = true;

      if (longPressGestureState.value !== State.ACTIVE) {
        itemScale.value = withTiming(
          HOLD_ITEM_SCALE_DOWN_VALUE,
          { duration: HOLD_ITEM_SCALE_DOWN_DURATION },
          isFinised => {
            if (isFinised) {
              runOnJS(handleActivate)();
              itemScale.value = 1;
              longPressGestureState.value = state;
            }
          }
        );
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;
      if (longPressGestureState.value !== State.ACTIVE) scaleBack();
    },
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const isAnimationActive = longPressGestureState.value === State.ACTIVE;
    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(1, { duration: 0 }));

    return {
      opacity: isAnimationActive ? 0 : animateOpacity(),
      transform: [
        {
          scale: isAnimationActive
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value,
        },
      ],
    };
  });
  const containerStyle = React.useMemo(() => [animatedContainerStyle], [
    animatedContainerStyle,
  ]);

  const animatedPortalStyle = useAnimatedStyle(() => {
    const isAnimationActive = longPressGestureState.value === State.ACTIVE;

    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(0, { duration: 0 }));

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      opacity: isAnimationActive ? 1 : animateOpacity(),
      transform: [
        {
          translateY: disableMove
            ? 0
            : withTiming(isAnimationActive ? -115 : -0.1, {
                duration: HOLD_ITEM_TRANSFORM_DURATION,
              }),
        },
        {
          scale: isAnimationActive
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value,
        },
      ],
    };
  });
  const portalContainerStyle = React.useMemo(() => [animatedPortalStyle], [
    animatedPortalStyle,
  ]);

  const animatedPortalProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents:
      longPressGestureState.value === State.ACTIVE ? 'auto' : 'none',
  }));

  return (
    <>
      <LongPressGestureHandler
        minDurationMs={150}
        onHandlerStateChange={longPressGestureEvent}
      >
        <Animated.View ref={containerRef} style={[styles, containerStyle]}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>

      <Portal>
        <Animated.View
          key={`item-${id}`}
          style={portalContainerStyle}
          animatedProps={animatedPortalProps}
        >
          {children}
          <Menu
            id={id}
            items={items}
            isActive={isActive}
            itemHeight={itemRectHeight.value}
            itemWidth={itemRectWidth.value}
            anchorPosition={transformOrigin.value}
            theme={theme || 'light'}
          />
        </Animated.View>
      </Portal>
    </>
  );
};

const HoldItemChild = React.memo(HoldItemChildComponent);

export default HoldItemChild;
