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
import { getZIndexValue } from "../utils/constants";

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
