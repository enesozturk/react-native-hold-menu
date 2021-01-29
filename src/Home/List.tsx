import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import ListItem from "./ListItem";
import { ListItemProps } from "./types";

const ListItems: ListItemProps[] = [
  {
    id: 1,
    title: "Sample Item",
    route: "SampleItem",
  },
  // {
  //   id: 1,
  //   title: "Whatsapp",
  //   route: "Whatsapp App",
  //   image: require("../assets/img/whatsapp.png"),
  // },
  // {
  //   id: 2,
  //   title: "Telegram",
  //   route: "Telegram App",
  //   image: require("../assets/img/telegram.png"),
  // },
];

interface ListProps {
  onPress: (route: string) => void;
}

const List = ({ onPress }: ListProps) => {
  return (
    <FlatList
      data={ListItems}
      keyExtractor={(item: ListItemProps) => String(item.id)}
      renderItem={({ item }: { item: ListItemProps }) => {
        return <ListItem item={item} onPress={() => onPress(item.route)} />;
      }}
    />
  );
};

export default List;

const styles = StyleSheet.create({});
