import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { MenuItemProps } from './types';
import { HoldMenuContext } from '../provider';
import styles from './styles';
import { useHoldMenu } from '../../hooks/useHoldMenu';

const MenuItemComponent = ({
  item,
  isLast,
}: {
  item: MenuItemProps;
  isLast?: boolean;
}) => {
  const { menuState } = useHoldMenu();

  const textStyles = React.useMemo(() => {
    return menuState.theme === 'dark' ? styles.textLight : styles.textDark;
  }, [menuState]);

  const borderStyles = React.useMemo(() => {
    return menuState.theme === 'dark'
      ? {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        }
      : {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        };
  }, [menuState]);

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
