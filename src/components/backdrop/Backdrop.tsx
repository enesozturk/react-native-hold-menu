import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

// Components
import { BlurView } from 'expo-blur';

// Utils
import { styles } from './styles';
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  WINDOW_HEIGHT,
} from '../../constants';
import { useInternal } from '../../hooks';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = () => {
  const { state, theme } = useInternal();

  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onActive: () => {},
      onCancel: () => {
        state.value = CONTEXT_MENU_STATE.END;
      },
      onEnd: () => {
        if (state.value === CONTEXT_MENU_STATE.ACTIVE) {
          state.value = CONTEXT_MENU_STATE.END;
        }
      },
      onFail: () => {
        state.value = CONTEXT_MENU_STATE.END;
      },
      onFinish: () => {
        state.value = CONTEXT_MENU_STATE.END;
      },
    },
    [state]
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? 0
        : withDelay(
            HOLD_ITEM_TRANSFORM_DURATION,
            withTiming(WINDOW_HEIGHT, {
              duration: 0,
            })
          );

    const opacityValueAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation(),
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.75)',
    };
  }, [theme]);

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}
    >
      <AnimatedBlurView
        // @ts-ignore
        intensity={100}
        tint="default"
        style={[styles.container, animatedContainerStyle]}
      >
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            animatedInnerContainerStyle,
          ]}
        />
      </AnimatedBlurView>
    </TapGestureHandler>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
