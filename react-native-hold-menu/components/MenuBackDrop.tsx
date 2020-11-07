import * as React from "react";
import { StyleSheet } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StyleGuide from "./StyleGuide";
import { BlurView } from "expo-blur";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export interface MenuBackDropProps {
  tint?: "dark" | "light";
  toggle: boolean;
  onCloseMenu: any;
}

export const MenuBackDrop = ({
  tint = "dark",
  toggle,
  onCloseMenu,
}: MenuBackDropProps) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toggle ? 1 : 0, { duration: 300 }),
      zIndex: toggle ? 10 : 5,
    };
  });

  return (
    <Animated.View style={[styles.background, {}, style]}>
      <BlurView
        tint={tint}
        intensity={100}
        style={StyleSheet.absoluteFillObject}
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
