import React, { useMemo } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

import { ListItemProps } from './types';
import StyleGuide from '../../utilities/styleGuide';
import { Feather as Icons } from '@expo/vector-icons';
import { useAppContext } from '../../hooks/useAppContext';

interface ListItemCompProps {
  item: ListItemProps;
  onPress: () => void;
  isLast?: boolean;
}

const ListItem = ({ item, onPress, isLast }: ListItemCompProps) => {
  const { theme } = useAppContext();

  const themeStyles = useMemo(() => {
    return {
      container: [
        styles.container,
        {
          backgroundColor: StyleGuide.palette[theme].secondary,
        },
      ],
      bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: StyleGuide.palette[theme].backgroundColor,
      },
      title: [
        styles.title,
        {
          color: StyleGuide.palette[theme].color,
        },
      ],
    };
  }, [theme]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        themeStyles.container,
        styles.row,
        !isLast && themeStyles.bottomBorder,
      ]}
    >
      <View style={styles.row}>
        {item.image && <Image style={styles.image} source={item.image} />}
        <Text style={themeStyles.title}>{item.title}</Text>
      </View>
      <Icons
        name="chevron-right"
        size={24}
        color={StyleGuide.palette[theme].color}
      />
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  container: {
    width: '100%',
    padding: StyleGuide.spacing * 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: StyleGuide.spacing * 4,
    height: StyleGuide.spacing * 4,
  },
  title: {
    ...StyleGuide.typography.body,
    marginLeft: StyleGuide.spacing,
  },
});
