import * as React from "react";
import { StyleSheet } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StyleGuide from "../components/StyleGuide";
import { BlurView } from "expo-blur";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export interface MenuBackDropProps {
  toggle: boolean;
  onCloseMenu: any;
  setIsMenuClosed: any;
}

const MenuBackDrop = ({
  toggle,
  onCloseMenu,
  setIsMenuClosed,
}: MenuBackDropProps) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toggle ? 1 : 0, { duration: 100 }, (finished) => {
        if (finished) {
          if (!toggle) setIsMenuClosed(true);
        }
      }),
    };
  });

  return (
    <Animated.View style={[styles.background, {}, style]}>
      <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback
          style={{ width: "100%", height: "100%" }}
          onPress={onCloseMenu}
        />
      </BlurView>
    </Animated.View>
  );
};

export default MenuBackDrop;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
});
