import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

import { MenuItemProps } from "../../types";
import styles from './styles'

export const MenuItem = ({ item, isLast, tint }: {
  item: MenuItemProps, isLast?: boolean
  , tint: "dark" | "light"
}) => {
  const textStyles = React.useMemo(() => {
    return tint == "dark" ? styles.textLight : styles.textDark
  }, [tint]);

  const borderStyles = React.useMemo(() => {
    return tint == "dark" ? {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    } : {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
      }
  }, [tint])

  return (
    <TouchableOpacity activeOpacity={0.4} style={[styles.menuItem, !isLast ? borderStyles : {}]}>
      <Text style={[styles.menuItemText, textStyles]}>{item.title}</Text>
      {item.icon}
    </TouchableOpacity>
  );
};

