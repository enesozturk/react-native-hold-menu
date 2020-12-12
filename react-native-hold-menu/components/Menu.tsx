import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import StyleGuide from "../components/StyleGuide";
import { MenuItemProps, MenuProps } from "../types";
import {
  CalculateMenuHeight,
  MenuAnimationAnchor,
  MENU_WIDTH,
} from "../utils/calculations";

import { MenuItem } from "./MenuItem";

export const MENU_CONTAINER_WIDTH =
  StyleGuide.dimensionWidth - StyleGuide.spacing * 4;

export const Menu = ({
  items,
  itemHeight,
  toggle,
  anchorPoint = "top-center",
  containerStyles = {},
  menuStyles = {},
}: MenuProps) => {
  const MenuHeight = CalculateMenuHeight(items.length > 0 ? items.length : 1);
  const leftOrRight = anchorPoint
    ? anchorPoint.includes("right")
      ? { right: 0 }
      : anchorPoint.includes("left")
      ? { left: 0 }
      : { left: -MENU_WIDTH / 4 }
    : {};
  const topValue =
    anchorPoint.split("-")[0] == "top"
      ? (itemHeight || 0) + StyleGuide.spacing
      : -1 * (MenuHeight + StyleGuide.spacing * 2);

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
          top: topValue,
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
        {items && items.length > 0 ? (
          items.map((item: MenuItemProps, index: number) => {
            return <MenuItem key={index} item={item} />;
          })
        ) : (
          <MenuItem
            item={{ id: 0, title: "Empty List", icon: "help-circle" }}
          />
        )}
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
