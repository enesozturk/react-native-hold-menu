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
  PREVIEW_CONTAINER_HEIGHT,
  WINDOW_HEIGHT,
} from '../../constants';

const MenuComponent = () => {
  const { state, menuProps, safeAreaInsets } = useInternal();

  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];

    const prevHeight =
      WINDOW_HEIGHT -
      menuProps.value.menuHeight -
      (safeAreaInsets?.top || 0) -
      (safeAreaInsets?.bottom || 0);

    const previewEnabled = menuProps.value.previewEnabled;
    const menuHeight =
      anchorPositionVertical === 'top' ? 0 : menuProps.value.menuHeight;
    const itemHeight = menuProps.value.previewEnabled
      ? prevHeight
      : menuProps.value.itemHeight;
    const itemY = menuProps.value.previewEnabled ? 64 : menuProps.value.itemY;

    const top = previewEnabled
      ? itemHeight + itemY + 8 + menuHeight
      : anchorPositionVertical === 'top'
      ? itemHeight + menuProps.value.itemY + 8
      : itemY - 8;
    const left = menuProps.value.itemX;
    const width = menuProps.value.itemWidth;
    const tY = menuProps.value.transformValue;

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
