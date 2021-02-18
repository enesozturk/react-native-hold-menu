import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { IMenuItem } from './types';

import styles from './styles';
import { useInternal } from '../../hooks/useInternal';

const MenuItemComponent = ({
  item,
  isLast,
}: {
  item: IMenuItem;
  isLast?: boolean;
}) => {
  const { state, theme } = useInternal();

  const textStyles = React.useMemo(() => {
    return theme.value === 'dark' ? styles.textLight : styles.textDark;
  }, [state]);

  const borderStyles = React.useMemo(() => {
    return theme.value === 'dark'
      ? {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        }
      : {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        };
  }, [state]);

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={[styles.menuItem, !isLast ? borderStyles : {}]}
    >
      <Text style={[styles.menuItemText, textStyles]}>{item.title}</Text>
      {item.icon}
    </TouchableOpacity>
  );
};

const MenuItem = React.memo(MenuItemComponent);
export default MenuItem;
