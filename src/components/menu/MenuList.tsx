import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import { BlurView } from 'expo-blur';

import MenuItem from './MenuItem';
// import { HoldMenuFlatList } from '../flatList';

import {
  MENU_WIDTH,
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE,
} from '../../constants';

import styles from './styles';
import { IMenuItem } from './types';
import { useInternal } from '../../hooks/useInternal';
// import isEqual from 'lodash.isequal';

const MenuContainerComponent = IS_IOS ? BlurView : View;
const AnimatedView = Animated.createAnimatedComponent(MenuContainerComponent);

const MenuListComponent = () => {
  const { state, theme, menuProps } = useInternal();

  const [itemList, setItemList] = React.useState<IMenuItem[]>([]);

  const menuHeight = useDerivedValue(
    () => calculateMenuHeight(itemList.length),
    [itemList]
  );

  const leftOrRight = () => {
    'worklet';

    const anchorPositionHorizontal = menuProps.value.anchorPosition.split(
      '-'
    )[1];
    const itemWidth = menuProps.value.itemWidth;

    let style = {};
    anchorPositionHorizontal === 'right'
      ? (style = { left: -MENU_WIDTH + itemWidth })
      : anchorPositionHorizontal === 'left'
      ? (style = { left: 0 })
      : (style = {
          left:
            -menuProps.value.itemWidth -
            MENU_WIDTH / 2 +
            menuProps.value.itemWidth / 2,
        });

    return style;
  };

  const messageStyles = useAnimatedStyle(() => {
    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length
    );

    const _leftOrRight = leftOrRight();

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

  function isObject(object: any) {
    'worklet';
    return object != null && typeof object === 'object';
  }

  function deepEqual(object1: any, object2: any) {
    'worklet';
    if (object1 === null || object2 === null) {
      return false;
    }

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !deepEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  }

  const setter = (items: IMenuItem[]) => {
    setItemList(items);
  };

  useAnimatedReaction(
    () => menuProps.value.items,
    (_items, _prevItems) => {
      if (!deepEqual(_items, _prevItems)) {
        runOnJS(setter)(_items);
      }
    },
    [menuProps]
  );

  const renderItems = useMemo(
    () => (
      <>
        {itemList && itemList.length > 0
          ? itemList.map((item: IMenuItem, index: number) => {
              return (
                <MenuItem item={item} isLast={itemList.length === index + 1} />
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
