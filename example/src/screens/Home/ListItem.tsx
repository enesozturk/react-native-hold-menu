import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";

import { ListItemProps } from "./types";
import StyleGuide from "../../utilities/styleGuide";
import Icons from "react-native-vector-icons/Feather";

interface ListItemCompProps {
  item: ListItemProps;
  onPress: () => void;
  isLast?: boolean;
}

const ListItem = ({ item, onPress, isLast }: ListItemCompProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, styles.row, !isLast && styles.bottomBorder]}
    >
      <View style={styles.row}>
        {item.image && (<Image style={styles.image} source={item.image} />)}
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Icons name="chevron-right" size={24} />
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: { display: "flex", flexDirection: "row", alignItems: "center" },
  container: {
    width: "100%",
    padding: StyleGuide.spacing * 2,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: StyleGuide.spacing * 4,
    height: StyleGuide.spacing * 4,
  },
  title: {
    ...StyleGuide.typography.body,
    marginLeft: StyleGuide.spacing,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: StyleGuide.palette.secondary
  }
});
