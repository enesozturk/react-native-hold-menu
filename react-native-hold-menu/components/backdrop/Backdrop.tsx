import React, { memo, useMemo } from "react";
import { Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";

// Components
import { BlurView } from "@react-native-community/blur";

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
    const isAnimationActive = data.value === CONTEXT_MENU_STATE.ACTIVE

    const topValueAnimation = () =>
      withDelay(isAnimationActive ? 10 : 125,
        withTiming(isAnimationActive ? 0 : WINDOW_HEIGHT, { duration: 0 }))
    const opacityValueAnimation = () =>
      withDelay(isAnimationActive ? 10 : 125,
        withTiming(isAnimationActive ? 1 : 0, { duration: 100 }))

    return { top: topValueAnimation(), opacity: opacityValueAnimation() };
  }, [data]);

  const containerStyle = useMemo(() => [styles.container, animatedContainerStyle], []);
  const blurViewBackgroundColor = useMemo(() => {
    return state.theme == "light" ?
      { backgroundColor: 'rgba(0, 0, 0, 0.6)' } :
      { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
  }, [state])
  //#endregion

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}
    >
      <AnimatedBlurView
        blurType={state.theme}
        style={[containerStyle, blurViewBackgroundColor]}
        blurAmount={40}
      >
        <Text>{tapGestureState.value}</Text>
      </AnimatedBlurView>
    </TapGestureHandler>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
