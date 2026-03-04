import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import Separator from './Separator';
import styles from './styles';

import { CONTEXT_MENU_STATE } from '../../constants';
import { useInternal } from '../../hooks';
import { getColor } from './calculations';
import { BORDER_DARK_COLOR, BORDER_LIGHT_COLOR } from './constants';
import { MenuItemProps } from './types';

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableOpacity as any
);

type MenuItemComponentProps = {
  item: MenuItemProps;
  isLast?: boolean;
};

const MenuItemComponent = ({ item, isLast }: MenuItemComponentProps) => {
  const { state, theme, menuActionParams, animatedIcon } = useInternal();
  const IconComponent = animatedIcon;

  const borderStyles = useAnimatedStyle(() => {
    const borderBottomColor =
      theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR;

    return {
      borderBottomColor,
      borderBottomWidth: isLast ? 0 : 1,
    };
  }, [theme, isLast, item]);

  const textColor = useAnimatedStyle(() => {
    return { color: getColor(item.isTitle, item.isDestructive, theme.value) };
  }, [theme, item]);

  const handleOnPress = useCallback(() => {
    if (!item.isTitle) {
      const params = menuActionParams[item.text] || [];
      if (item.onPress) item.onPress(...params);
      state.value = CONTEXT_MENU_STATE.END;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, menuActionParams, state]);

  return (
    <>
      <AnimatedTouchable
        onPress={handleOnPress}
        activeOpacity={!item.isTitle ? 0.4 : 1}
        style={[styles.menuItem, borderStyles]}
      >
        <Animated.Text
          style={[
            item.isTitle ? styles.menuItemTitleText : styles.menuItemText,
            textColor,
          ]}
        >
          {item.text}
        </Animated.Text>
        {!item.isTitle &&
          item.icon &&
          (IconComponent && typeof item.icon === 'string' ? (
            <IconComponent name={item.icon} size={18} style={textColor} />
          ) : typeof item.icon === 'function' ? (
            item.icon()
          ) : null)}
      </AnimatedTouchable>
      {item.withSeparator && <Separator />}
    </>
  );
};

const MenuItem = React.memo(MenuItemComponent);
export default MenuItem;
