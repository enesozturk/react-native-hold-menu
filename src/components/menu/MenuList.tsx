import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import { BlurView } from 'expo-blur';

import MenuItem from './MenuItem';

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE,
} from '../../constants';

import styles from './styles';
import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { deepEqual } from '../../utils/validations';
import { leftOrRight } from './calculations';

const MenuContainerComponent = IS_IOS ? BlurView : View;
const AnimatedView = Animated.createAnimatedComponent(MenuContainerComponent);

const MenuListComponent = () => {
  const { state, theme, menuProps } = useInternal();

  const [itemList, setItemList] = React.useState<MenuItemProps[]>([]);

  const menuHeight = useDerivedValue(
    () => calculateMenuHeight(itemList.length),
    [itemList]
  );
  const prevList = useSharedValue<MenuItemProps[]>([]);

  const messageStyles = useAnimatedStyle(() => {
    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length
    );

    const _leftOrRight = leftOrRight(menuProps);

    const menuScaleAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    const opacityAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      ..._leftOrRight,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [
        { translateX: translate.begginingTransformations.translateX },
        { translateY: translate.begginingTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY },
      ],
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light'
          ? 'rgba(255, 255, 255, .75)'
          : 'rgba(0,0,0,0.5)',
    };
  }, [theme]);

  const animatedProps = useAnimatedProps(() => {
    return { blurType: theme.value };
  }, [theme]);

  const setter = (items: MenuItemProps[]) => {
    setItemList(items);
    prevList.value = items;
  };

  useAnimatedReaction(
    () => menuProps.value.items,
    _items => {
      if (!deepEqual(_items, prevList.value)) {
        runOnJS(setter)(_items);
      }
    },
    [menuProps]
  );

  const renderItems = useMemo(
    () => (
      <>
        {itemList && itemList.length > 0
          ? itemList.map((item: MenuItemProps, index: number) => {
              return (
                <MenuItem
                  key={index}
                  item={item}
                  isLast={itemList.length === index + 1}
                />
              );
            })
          : null}
      </>
    ),
    [itemList]
  );

  return (
    <AnimatedView
      // @ts-ignore
      intensity={100}
      animatedProps={animatedProps}
      style={[styles.menuContainer, messageStyles]}
    >
      <Animated.View
        style={[
          { ...StyleSheet.absoluteFillObject },
          animatedInnerContainerStyle,
        ]}
      >
        {renderItems}
      </Animated.View>
    </AnimatedView>
  );
};

const MenuList = React.memo(MenuListComponent);

export default MenuList;
