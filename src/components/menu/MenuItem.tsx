import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { IMenuItem } from './types';

import styles from './styles';
import { useInternal } from '../../hooks/useInternal';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MenuItemComponent = ({
  item,
  isLast,
}: {
  item: IMenuItem;
  isLast?: boolean;
}) => {
  const { theme } = useInternal();

  const textStyles = useAnimatedStyle(() => {
    return {
      color: theme.value === 'dark' ? 'white' : 'black',
    };
  }, [theme]);

  const borderStyles = useAnimatedStyle(() => {
    return theme.value === 'dark'
      ? {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        }
      : {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        };
  }, [theme]);

  return (
    <AnimatedTouchable
      activeOpacity={0.4}
      style={[styles.menuItem, !isLast ? borderStyles : {}]}
    >
      <Animated.Text style={[styles.menuItemText, textStyles]}>
        {item.title}
      </Animated.Text>
      {item.icon}
    </AnimatedTouchable>
  );
};

const MenuItem = React.memo(MenuItemComponent);
export default MenuItem;
