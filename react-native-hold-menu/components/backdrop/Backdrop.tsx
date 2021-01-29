import React, { memo, useMemo } from "react";
import { Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";

// Components
import { BlurView } from "expo-blur";

// Utils
import { styles } from "./styles";
import { CONTEXT_MENU_STATE, WINDOW_HEIGHT } from "../../constants";
import { HoldMenuContext } from "../provider";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = () => {
  const [state, dispatch] = React.useContext(HoldMenuContext)
  const data = useSharedValue(0)

  //#region effects
  React.useEffect(() => {
    if (data.value != state.active)
      data.value = state.active
  }, [state])
  //#endregion

  //#region gesture
  const handleDeactivate = () => { dispatch({ type: 'end' }) }
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
        if (data.value == CONTEXT_MENU_STATE.ACTIVE) {
          runOnJS(handleDeactivate)()
        }
        data.value = CONTEXT_MENU_STATE.END;
      },
      onEnd: ({ state }) => {
        tapGestureState.value = state;
        if (data.value == CONTEXT_MENU_STATE.ACTIVE) {
          runOnJS(handleDeactivate)()
        }
        data.value = CONTEXT_MENU_STATE.END;
      },
      onFail: ({ state }) => {
        tapGestureState.value = state;
        if (data.value == CONTEXT_MENU_STATE.ACTIVE) {
          runOnJS(handleDeactivate)()
        }
        data.value = CONTEXT_MENU_STATE.END;
      },
      onFinish: ({ state }) => {
        tapGestureState.value = state;
        if (data.value == CONTEXT_MENU_STATE.ACTIVE) {
          runOnJS(handleDeactivate)()
        }
        data.value = CONTEXT_MENU_STATE.END;
      },
    },
    [tapGestureState, data]
  );
  //#endregion

  //#region styles
  const animatedContainerStyle = useAnimatedStyle(() => {
    return { top: data.value === CONTEXT_MENU_STATE.ACTIVE ? 0 : WINDOW_HEIGHT };
  }, [data]);

  const containerStyle = useMemo(() => [styles.container, animatedContainerStyle], []);

  const animatedBlurViewProps = useAnimatedProps(() => {
    return {
      intensity: withTiming(data.value === CONTEXT_MENU_STATE.ACTIVE ? 100 : 0, { duration: 200 }),
    };
  }, [data]);
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
