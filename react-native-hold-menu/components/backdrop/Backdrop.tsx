import React, { memo, useMemo } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { CONTEXT_MENU_STATE, WINDOW_HEIGHT } from "../../constants";
import type { BackdropProps } from "./types";
import { styles } from "./styles";
import { Text } from "react-native";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = ({ contextMenuState }: BackdropProps) => {
  //#region gesture
  const tapGestureState = useSharedValue<State>(State.UNDETERMINED, false);
  const tapGestureEvent = useAnimatedGestureHandler(
    {
      onStart: ({ state }) => {
        tapGestureState.value = state;
      },
      onActive: ({ state }) => {
        tapGestureState.value = state;
      },
      onCancel: ({ state }) => {
        tapGestureState.value = state;
        contextMenuState.value = CONTEXT_MENU_STATE.END;
      },
      onEnd: ({ state }) => {
        tapGestureState.value = state;
        contextMenuState.value = CONTEXT_MENU_STATE.END;
      },
      onFail: ({ state }) => {
        tapGestureState.value = state;
        contextMenuState.value = CONTEXT_MENU_STATE.END;
      },
      onFinish: ({ state }) => {
        tapGestureState.value = state;
        contextMenuState.value = CONTEXT_MENU_STATE.END;
      },
    },
    [tapGestureState, contextMenuState]
  );
  //#endregion

  //#region styles
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      top:
        contextMenuState.value === CONTEXT_MENU_STATE.ACTIVE
          ? 0
          : WINDOW_HEIGHT,
      // zIndex: contextMenuState.value === CONTEXT_MENU_STATE.ACTIVE ? 500 : 0,
    };
  }, [contextMenuState]);
  const containerStyle = useMemo(
    () => [styles.container, animatedContainerStyle],
    []
  );
  const animatedBlurViewProps = useAnimatedProps(() => {
    return {
      intensity: withTiming(
        contextMenuState.value === CONTEXT_MENU_STATE.ACTIVE ? 100 : 0,
        {
          duration: 250,
        }
      ),
    };
  }, [contextMenuState]);
  //#endregion

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}
    >
      <AnimatedBlurView
        tint="dark"
        intensity={0}
        style={containerStyle}
        animatedProps={animatedBlurViewProps}
      >
        <Text>{tapGestureState.value}</Text>
      </AnimatedBlurView>
    </TapGestureHandler>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
