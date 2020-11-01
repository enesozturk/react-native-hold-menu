import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTiming } from "react-native-redash";

import StyleGuide from "../components/StyleGuide";
import { MenuItem } from "./MenuItem";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export interface MenuProps {
  toggle: boolean;
  rtl: boolean;
}

const MenuItems = [
  {
    id: 1,
    title: "Star",
    icon: "star",
  },
  {
    id: 2,
    title: "Answer",
    icon: "corner-up-left",
  },
  {
    id: 3,
    title: "Forward",
    icon: "corner-up-right",
  },
  {
    id: 4,
    title: "Copy",
    icon: "copy",
  },
  {
    id: 5,
    title: "Info",
    icon: "info",
  },
  {
    id: 6,
    title: "Delete",
    icon: "trash",
  },
];

export const Menu = ({ toggle, rtl }: MenuProps) => {
  const MenuHeight = 240;
  const transition = useTiming(toggle, { duration: 200 });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: (MENU_WIDTH / 2) * (rtl ? 1 : -1) },
        { translateY: (-1 * MenuHeight) / 2 },
        { scale: transition.value },
        { translateX: (MENU_WIDTH / 2) * (rtl ? -1 : 1) },
        { translateY: MenuHeight / 2 },
      ],
    };
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { height: MenuHeight, ...style }]}
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
    width: MENU_WIDTH,
    backgroundColor: "blue",
    marginTop: StyleGuide.spacing,
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
