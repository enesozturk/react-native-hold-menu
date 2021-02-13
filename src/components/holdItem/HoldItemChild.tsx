import React, { memo, useMemo } from 'react';

import { Portal } from '@gorhom/portal';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
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
  withSpring,
} from 'react-native-reanimated';

// Components
import Menu from '../menu';

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
} from '../../constants';
import { ViewProps } from 'react-native';
import styles from './styles';
import { useDeviceOrientation } from '../../hooks';

// Types
import type { HoldItemChildProps } from './types';
import styleGuide from '../../styleGuide';

type Context = { didMeasureLayout: boolean };

const HoldItemChildComponent = ({
  id,
  items,
  theme,
  styles: customStyles,
  children,
  isActive,
  onActivate,
  disableMove,
  menuAnchorPosition,
}: HoldItemChildProps) => {
  const containerRef = useAnimatedRef<Animated.View>();

  const itemRectY = useSharedValue<number>(0);
  const itemRectX = useSharedValue<number>(0);
  const itemRectWidth = useSharedValue<number>(0);
  const itemRectHeight = useSharedValue<number>(0);
  const itemScale = useSharedValue<number>(1);

  const transformOrigin = useSharedValue<TransformOriginAnchorPosition>(
    menuAnchorPosition || 'top-right'
  );

  const deviceOrientation = useDeviceOrientation();

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
          deviceOrientation == 'portrait' ? WINDOW_WIDTH : WINDOW_HEIGHT
        );
        transformOrigin.value = position;
      }
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
    onActive: (_, context) => {
      activateAnimation(context);
      context.didMeasureLayout = true;

      if (!isActive.value) {
        itemScale.value = withTiming(
          HOLD_ITEM_SCALE_DOWN_VALUE,
          { duration: HOLD_ITEM_SCALE_DOWN_DURATION },
          isFinised => {
            const isListValid = items && items.length > 0;
            if (isFinised && isListValid) {
              if (onActivate) runOnJS(onActivate)();
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
    () => [customStyles, animatedContainerStyle],
    [animatedContainerStyle]
  );

  const animatedPortalStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(0, { duration: 0 }));

    const height =
      deviceOrientation == 'portrait' ? WINDOW_HEIGHT : WINDOW_WIDTH;
    const valueToTransform =
      height -
      (itemRectY.value +
        itemRectHeight.value +
        menuHeight +
        styleGuide.spacing * 2);

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
          translateY: disableMove
            ? 0
            : isActive.value
            ? withSpring(
                valueToTransform < 0 ? valueToTransform : 0,
                SPRING_CONFIGURATION
              )
            : withTiming(-0.1, { duration: HOLD_ITEM_TRANSFORM_DURATION }),
        },
        {
          scale: isActive.value
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value,
        },
      ],
    };
  });
  const portalContainerStyle = useMemo(() => [animatedPortalStyle], [
    animatedPortalStyle,
    styles.holdItem,
  ]);

  const animatedPortalProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: isActive.value ? 'auto' : 'none',
  }));

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

      <Portal key={`item-${id}`}>
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
            itemHeight={itemRectHeight}
            itemWidth={itemRectWidth}
            anchorPosition={transformOrigin}
            theme={theme || 'light'}
          />
        </Animated.View>
      </Portal>
    </>
  );
};

const HoldItemChild = memo(HoldItemChildComponent, (prevProps, nextProps) => {
  if (prevProps.isActive.value === nextProps.isActive.value) return true;
  else return false;
});

export default HoldItemChild;
