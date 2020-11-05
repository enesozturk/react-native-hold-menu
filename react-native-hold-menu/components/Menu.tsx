import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTiming } from "react-native-redash";

import StyleGuide from "../components/StyleGuide";
import { MenuProps } from "../types";
import {
  CalculateMenuHeight,
  MenuAnimationAnchor,
} from "../utils/Calculations";
import { MenuItems } from "../variables";
import { MenuItem } from "./MenuItem";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export const Menu = ({ itemHeight, toggle, anchorPoint }: MenuProps) => {
  const MenuHeight = CalculateMenuHeight(MenuItems.length);
  const transition = useTiming(toggle, { duration: 200 });
  const leftOrRight = anchorPoint.includes("right")
    ? { right: 0 }
    : { left: 0 };

  const Translate = MenuAnimationAnchor(anchorPoint);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: Translate.begginingTransformations.translateX },
        { translateY: Translate.begginingTransformations.translateY },
        { scale: transition.value },
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
          top: itemHeight + 8,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          { height: MenuHeight, ...leftOrRight },
          { ...style },
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
    width: StyleGuide.dimensionWidth - StyleGuide.spacing * 4,
    zIndex: 10,
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
