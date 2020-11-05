import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import StyleGuide from "../components/StyleGuide";
import { Feather } from "@expo/vector-icons";
import { MenuItemHeight } from "../utils/Calculations";

export interface MenuItemProps {
  item: {
    title: string;
    icon: string;
  };
}

export const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.4} style={[styles.container]}>
      <Text style={styles.text}>{item.title}</Text>
      <Feather name={item.icon} size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
