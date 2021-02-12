import React, { memo } from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

// Components
import { BlurView } from '@react-native-community/blur';

// Utils
import { styles } from './styles';
import { HOLD_ITEM_TRANSFORM_DURATION, WINDOW_HEIGHT } from '../../constants';
import { Portal } from '@gorhom/portal';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = ({
  activeItem,
  handleDeactivate,
}: {
  activeItem: Animated.SharedValue<number>;
  handleDeactivate: () => void;
}) => {
  const tapGestureState = useSharedValue<State>(State.UNDETERMINED);
  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
      },
      onActive: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
      },
      onCancel: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        runOnJS(handleDeactivate)();
      },
      onEnd: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        runOnJS(handleDeactivate)();
      },
      onFail: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        runOnJS(handleDeactivate)();
      },
      onFinish: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        runOnJS(handleDeactivate)();
      },
    },
    [tapGestureState]
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () =>
      activeItem.value > 0
        ? withTiming(activeItem.value > 0 ? 0 : WINDOW_HEIGHT, { duration: 0 })
        : withDelay(
            HOLD_ITEM_TRANSFORM_DURATION,
            withTiming(activeItem.value > 0 ? 0 : WINDOW_HEIGHT, {
              duration: 0,
            })
          );

    const opacityValueAnimation = () =>
      withTiming(activeItem.value > 0 ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation(),
    };
  });

  return (
    <Portal>
      <TapGestureHandler
        onGestureEvent={tapGestureEvent}
        onHandlerStateChange={tapGestureEvent}
      >
        <AnimatedBlurView
          blurType="light"
          blurAmount={40}
          style={[styles.container, animatedContainerStyle]}
        />
      </TapGestureHandler>
    </Portal>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
