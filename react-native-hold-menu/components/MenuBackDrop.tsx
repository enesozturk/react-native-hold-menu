import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { BlurView } from "expo-blur";
import { MenuBackDropProps } from "../types";

export const MenuBackDrop = ({
  tint = "dark",
  toggle,
  onCloseMenu,
  containerStyle,
}: MenuBackDropProps) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toggle ? 1 : 0, { duration: toggle ? 300 : 0 }),
      zIndex: toggle ? 10 : 5,
    };
  });

  return (
    <Animated.View
      style={[styles.background, { ...containerStyle }, { ...style }]}
    >
      <BlurView
        tint={tint}
        intensity={100}
        style={[StyleSheet.absoluteFillObject]}
      >
        <TouchableWithoutFeedback
          style={{ width: "100%", height: "100%" }}
          onPress={onCloseMenu}
        />
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
});
