import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

import { MenuItemProps } from "../../types";
import { HoldMenuContext } from "../provider";
import styles from './styles'

export const MenuItem = ({ item, isLast }: {
  item: MenuItemProps, isLast?: boolean
}) => {
  const [state, dispatch] = React.useContext(HoldMenuContext)

  const textStyles = React.useMemo(() => {
    return state.theme == "dark" ? styles.textLight : styles.textDark
  }, [state]);

  const borderStyles = React.useMemo(() => {
    return state.theme == "dark" ? {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    } : {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
      }
  }, [state])


  return (
    <TouchableOpacity activeOpacity={0.4} style={[styles.menuItem, !isLast ? borderStyles : {}]}>
      <Text style={[styles.menuItemText, textStyles]}>{item.title}</Text>
      {item.icon}
    </TouchableOpacity>
  );
};

