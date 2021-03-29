import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import Separator from './Separator';
import styles from './styles';

import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { CONTEXT_MENU_STATE, IS_IOS } from '../../constants';
import {
  BORDER_LIGHT_COLOR,
  BORDER_DARK_COLOR,
  MENU_TITLE_COLOR,
  MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT,
  MENU_TEXT_DESTRUCTIVE_COLOR_DARK,
  MENU_TEXT_DARK_COLOR,
  MENU_TEXT_LIGHT_COLOR,
} from './constants';
import isEqual from 'lodash.isequal';

const ItemComponent = IS_IOS ? TouchableOpacity : GHTouchableOpacity;
const AnimatedTouchable = Animated.createAnimatedComponent(ItemComponent);

type MenuItemComponentProps = {
  item: MenuItemProps;
  isLast?: boolean;
  theme: 'light' | 'dark';
};

const MenuItemComponent = ({ item, isLast, theme }: MenuItemComponentProps) => {
  const { state } = useInternal();

  const borderStyles = useAnimatedStyle(() => {
    const borderBottomColor =
      theme === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR;

    return {
      borderBottomColor,
      borderBottomWidth: isLast ? 0 : 1,
    };
  }, [theme, isLast]);

  const textColor = useMemo(() => {
    return {
      color: item.isTitle
        ? MENU_TITLE_COLOR
        : item.isDestructive
        ? theme === 'dark'
          ? MENU_TEXT_DESTRUCTIVE_COLOR_DARK
          : MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT
        : theme === 'dark'
        ? MENU_TEXT_DARK_COLOR
        : MENU_TEXT_LIGHT_COLOR,
    };
  }, [item, theme]);

  const handleOnPress = useCallback(() => {
    if (!item.isTitle) {
      if (item.onPress) item.onPress();
      state.value = CONTEXT_MENU_STATE.END;
    }
  }, [state, item]);

  return (
    <>
      <AnimatedTouchable
        onPress={handleOnPress}
        activeOpacity={!item.isTitle ? 0.4 : 1}
        style={[styles.menuItem, borderStyles]}
      >
        <Text
          style={[
            item.isTitle ? styles.menuItemTitleText : styles.menuItemText,
            textColor,
          ]}
        >
          {item.text}
        </Text>
        {!item.isTitle && item.icon && item.icon()}
      </AnimatedTouchable>
      {(item.withSeparator || item.withSeperator) && (
        <Separator theme={theme} />
      )}
    </>
  );
};

const MenuItem = React.memo(MenuItemComponent, isEqual);
export default MenuItem;
