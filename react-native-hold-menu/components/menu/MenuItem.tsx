import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

import { MenuItemProps } from "../../types";
import styles from './styles'

export const MenuItem = ({ item }: { item: MenuItemProps }) => {
  return (
    <TouchableOpacity activeOpacity={0.4} style={[styles.menuItem]}>
      <Text style={styles.menuItemText}>{item.title}</Text>
      {item.icon}
    </TouchableOpacity>
  );
};

