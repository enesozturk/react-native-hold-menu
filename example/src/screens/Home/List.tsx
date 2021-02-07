import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "./ListItem";
import { ListItemProps } from "./types";

const ListItems: ListItemProps[] = [
  {
    id: 1,
    title: "Playground",
    route: "Playground",
  },
  {
    id: 2,
    title: "Whatsapp",
    route: "Whatsapp",
  },
  {
    id: 3,
    title: "Telegram",
    route: "Telegram",
  },
];

interface ListProps {
  onPress: (route: string) => void;
}

const List = ({ onPress }: ListProps) => {
  return (
    <FlatList
      data={ListItems}
      keyExtractor={(item: ListItemProps) => String(item.id)}
      renderItem={({ item, index }: { item: ListItemProps, index: number }) => {
        const isLastItem = index == ListItems.length - 1
        return <ListItem item={item} onPress={() => onPress(item.route)} isLast={isLastItem} />;
      }}
    />
  );
};

export default List;

const styles = StyleSheet.create({});
