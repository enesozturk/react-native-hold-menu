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
import { CONTEXT_MENU_STATE, HOLD_ITEM_TRANSFORM_DURATION, WINDOW_HEIGHT } from "../../constants";
import { HoldMenuContext } from "../provider";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = () => {
  const [state, dispatch] = React.useContext(HoldMenuContext)
  const data = useSharedValue(0)

  React.useEffect(() => {
    if (data.value != state.active)
      data.value = state.active
  }, [state])

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
    [tapGestureState]
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    const isAnimationActive = data.value === CONTEXT_MENU_STATE.ACTIVE

    const topValueAnimation = () =>
      isAnimationActive ? withTiming(isAnimationActive ? 0 : WINDOW_HEIGHT, { duration: 0 }) :
        withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(isAnimationActive ? 0 : WINDOW_HEIGHT, { duration: 0 }))

    const opacityValueAnimation = () =>
      withTiming(isAnimationActive ? 1 : 0, { duration: HOLD_ITEM_TRANSFORM_DURATION })

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation(),
    };
  }, [data]);

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}
    >
      <AnimatedBlurView
        blurType={state.theme}
        style={[styles.container, {
          backgroundColor: state.theme == "light" ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'
        }, animatedContainerStyle]}
        blurAmount={40}
      />
    </TapGestureHandler>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
