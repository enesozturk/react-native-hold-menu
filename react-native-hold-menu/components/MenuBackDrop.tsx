import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import Animated, {
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { BlurView } from "expo-blur";
import { MenuBackDropProps } from "../types";
import { BACKDROP_ZINDEX_STATE } from "../utils/constants";

export const MenuBackDrop = ({
  tint = "dark",
  toggle,
  onCloseMenu,
}: MenuBackDropProps) => {
  const [wasActive, setWasActive] = React.useState<boolean>(false);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        toggle ? 1 : 0,
        { duration: 150 },
        (isFinished: boolean) => {
          if (isFinished && !toggle) {
            runOnJS(setWasActive)(false);
          }
        }
      ),
    };
  }, [toggle]);

  React.useEffect(() => {
    if (toggle) {
      setWasActive(true);
    }
  }, [toggle]);

  const getZIndexValue = (wasActive: boolean, toggle: boolean) => {
    if (wasActive && toggle) return BACKDROP_ZINDEX_STATE.ACTIVE;
    else if (wasActive && !toggle) return BACKDROP_ZINDEX_STATE.WILL_FADE_OUT;
    else return BACKDROP_ZINDEX_STATE.DID_FADE_OUT;
  };

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { zIndex: getZIndexValue(wasActive, toggle) },
        { ...style },
      ]}
    >
      <BlurView tint={tint} intensity={100} style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback
          style={{ width: "100%", height: "100%" }}
          onPress={onCloseMenu}
        />
      </BlurView>
    </Animated.View>
  );
};
