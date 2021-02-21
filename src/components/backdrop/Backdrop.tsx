import React, { memo } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
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
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  WINDOW_HEIGHT,
} from '../../constants';
import { useInternal } from '../../hooks/useInternal';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = () => {
  const { state, theme } = useInternal();
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
        state.value = CONTEXT_MENU_STATE.END;
      },
      onEnd: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        state.value = CONTEXT_MENU_STATE.END;
      },
      onFail: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        state.value = CONTEXT_MENU_STATE.END;
      },
      onFinish: ({ state: handlerState }) => {
        tapGestureState.value = handlerState;
        state.value = CONTEXT_MENU_STATE.END;
      },
    },
    [tapGestureState, state]
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withTiming(0, { duration: 0 })
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
      backgroundColor:
        theme.value === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)',
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      blurType: theme.value,
    };
  }, [theme]);

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}
    >
      <AnimatedBlurView
        blurAmount={40}
        animatedProps={animatedProps}
        style={[styles.container, animatedContainerStyle]}
      />
    </TapGestureHandler>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
