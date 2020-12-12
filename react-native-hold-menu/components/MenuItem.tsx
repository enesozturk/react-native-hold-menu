import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import StyleGuide from "../components/StyleGuide";
import { MenuItemHeight, MENU_WIDTH } from "../utils/calculations";
import { MenuItemProps } from "../types";

export const MenuItem = ({ item }: { item: MenuItemProps }) => {
  return (
    <TouchableOpacity activeOpacity={0.4} style={[styles.container]}>
      <Text style={styles.text}>{item.title}</Text>
      <Feather name={item.icon} size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: MENU_WIDTH,
    height: MenuItemHeight(),
    borderBottomWidth: 1,
    borderBottomColor: StyleGuide.palette.secondary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  text: {
    ...StyleGuide.typography.callout,
  },
});
