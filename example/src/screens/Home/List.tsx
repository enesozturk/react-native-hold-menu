import React from 'react';
import { FlatList } from 'react-native';

import ListItem from './ListItem';
import { ListItemProps } from './types';

const ListItems: ListItemProps[] = [
  {
    title: 'Playground',
  },
  {
    title: 'Whatsapp',
  },
  {
    title: 'Telegram',
  },
  {
    title: 'Clubhouse',
  },
];

interface ListProps {
  onPress: (route: string) => void;
}

const List = ({ onPress }: ListProps) => {
  return (
    <FlatList
      data={ListItems}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item, index }: { item: ListItemProps; index: number }) => {
        const isLastItem = index === ListItems.length - 1;
        return (
          <ListItem
            item={item}
            onPress={() => onPress(item.title)}
            isLast={isLastItem}
          />
        );
      }}
    />
  );
};

export default List;
