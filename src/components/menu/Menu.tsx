import React from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import MenuList from './MenuList';

import styles from './styles';
import { useInternal } from '../../hooks';
import {
  HOLD_ITEM_TRANSFORM_DURATION,
  CONTEXT_MENU_STATE,
  SPRING_CONFIGURATION,
} from '../../constants';

const MenuComponent = () => {
  const { state, menuProps } = useInternal();

  const wrapperStyles = useAnimatedStyle(() => {
    // Add fallback values to prevent errors when menuProps are not yet initialized
    const anchorPosition = menuProps.value.anchorPosition || 'top-center';
    const anchorPositionVertical = anchorPosition.split('-')[0];
    const itemHeight = menuProps.value.itemHeight || 0;
    const itemY = menuProps.value.itemY || 0;
    const itemX = menuProps.value.itemX || 0;
    const itemWidth = menuProps.value.itemWidth || 0;
    const tY = menuProps.value.transformValue || 0;

    const top =
      anchorPositionVertical === 'top'
        ? itemHeight + itemY + 8
        : itemY - 8;
    const left = itemX;
    const width = itemWidth;

    return {
      top,
      left,
      width,
      transform: [
        {
          translateY:
            state.value === CONTEXT_MENU_STATE.ACTIVE
              ? withSpring(tY, SPRING_CONFIGURATION)
              : withTiming(0, { duration: HOLD_ITEM_TRANSFORM_DURATION }),
        },
      ],
    };
  }, [menuProps]);

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
      <MenuList />
    </Animated.View>
  );
};

const Menu = React.memo(MenuComponent);

export default Menu;
