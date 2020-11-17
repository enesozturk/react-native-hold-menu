import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, {
  runOnUI,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import StyleGuide from "../components/StyleGuide";
import { MenuProps } from "../types";
import {
  CalculateMenuHeight,
  MenuAnimationAnchor,
} from "../utils/Calculations";
import { MenuItems } from "../variables";
import { MenuItem } from "./MenuItem";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;
export const MENU_CONTAINER_WIDTH =
  StyleGuide.dimensionWidth - StyleGuide.spacing * 4;

export const Menu = ({
  itemHeight,
  toggle,
  anchorPoint = "top-center",
  containerStyles = {},
  menuStyles = {},
}: MenuProps) => {
  const MenuHeight = CalculateMenuHeight(MenuItems.length);
  const leftOrRight = anchorPoint
    ? anchorPoint.includes("right")
      ? { right: 0 }
      : anchorPoint.includes("left")
      ? { left: 0 }
      : { left: -MENU_WIDTH / 4 }
    : {};

  const Translate = MenuAnimationAnchor(anchorPoint || "top-right");
  const messageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: Translate.begginingTransformations.translateX },
        { translateY: Translate.begginingTransformations.translateY },
        {
          scale: withTiming(toggle ? 1 : 0, { duration: 150 }),
        },
        { translateX: Translate.endingTransformations.translateX },
        { translateY: Translate.endingTransformations.translateY },
      ],
    };
  });

  return (
    <View
      style={[
        styles.wrapper,
        {
          ...leftOrRight,
          zIndex: toggle ? 5 : 10,
          top: -1 * (MenuHeight + StyleGuide.spacing * 2),
          ...containerStyles,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          { height: MenuHeight, ...leftOrRight, ...menuStyles },
          { ...messageStyles },
        ]}
      >
        {MenuItems.map((item, index) => {
          return <MenuItem key={index} item={item} />;
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: MENU_CONTAINER_WIDTH,
    zIndex: 150,
  },
  container: {
    position: "absolute",
    width: MENU_WIDTH,
    borderRadius: StyleGuide.spacing * 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.common.white,
    overflow: "hidden",
  },
});
