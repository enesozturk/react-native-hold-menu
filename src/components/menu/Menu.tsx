import React, { useMemo } from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import styleGuide from '../../styleGuide';
import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import { BlurView } from '@react-native-community/blur';

import MenuItem from './MenuItem';
import {
  MENU_WIDTH,
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
} from '../../constants';

import styles from './styles';
import { IMenuItem, IMenu } from './types';
import { useInternal } from '../../hooks/useInternal';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const MenuComponent = ({
  items,
  isActive,
  itemHeight,
  itemWidth,
  anchorPosition,
}: IMenu) => {
  const { theme } = useInternal();
  const menuHeight = useMemo(() => calculateMenuHeight(items.length), [
    anchorPosition,
  ]);

  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = anchorPosition.value.split('-')[0];

    return {
      top:
        anchorPositionVertical === 'top'
          ? (itemHeight.value || 0) + styleGuide.spacing
          : -1 * (menuHeight + styleGuide.spacing),
      width: itemWidth.value,
    };
  });

  const messageStyles = useAnimatedStyle(() => {
    const translate = menuAnimationAnchor(
      anchorPosition.value,
      itemWidth.value,
      items.length
    );
    const anchorPositionHorizontal = anchorPosition.value.split('-')[1];

    const leftOrRight =
      anchorPositionHorizontal === 'right'
        ? { right: 0 }
        : anchorPositionHorizontal === 'left'
        ? { left: 0 }
        : { left: -itemWidth.value - MENU_WIDTH / 2 + itemWidth.value / 2 };

    const menuScaleAnimation = () =>
      isActive.value
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    const opacityAnimation = () =>
      withTiming(isActive.value ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      ...leftOrRight,
      height: menuHeight,
      backgroundColor:
        theme.value == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0, 0, 0, 0.4)',
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

  const itemList = () => (
    <>
      {items && items.length > 0 ? (
        items.map((item: IMenuItem, index: number) => {
          return (
            <MenuItem
              key={index}
              item={item}
              isLast={items.length === index + 1}
            />
          );
        })
      ) : (
        <MenuItem
          item={{ title: 'Empty List', icon: null, onPress: () => {} }}
        />
      )}
    </>
  );

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
      {!IS_IOS ? (
        <Animated.View style={[styles.menuContainer, messageStyles]}>
          {itemList}
        </Animated.View>
      ) : (
        <AnimatedBlurView
          blurType="light"
          blurAmount={20}
          style={[styles.menuContainer, messageStyles]}
        >
          {items && items.length > 0
            ? items.map((item: IMenuItem, index: number) => {
                return (
                  <MenuItem
                    key={index}
                    item={item}
                    isLast={items.length === index + 1}
                  />
                );
              })
            : null}
        </AnimatedBlurView>
      )}
    </Animated.View>
  );
};

const Menu = React.memo(MenuComponent);

export default Menu;
