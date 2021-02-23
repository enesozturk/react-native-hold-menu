import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { menuAnimationAnchor } from '../../utils/calculations';
import { BlurView } from 'expo-blur';

import MenuItem from './MenuItem';
import {
  MENU_WIDTH,
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE,
  SPRING_CONFIGURATION,
} from '../../constants';

import styles from './styles';
import { IMenuItem, IMenu } from './types';
import { useInternal } from '../../hooks/useInternal';

const MenuContainerComponent = IS_IOS ? BlurView : View;
const AnimatedView = Animated.createAnimatedComponent(MenuContainerComponent);

const MenuComponent = ({}: IMenu) => {
  const { state, theme, menuProps } = useInternal();

  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];

    const top =
      anchorPositionVertical === 'top'
        ? menuProps.value.itemHeight + menuProps.value.itemY + 8
        : menuProps.value.itemY - 8 - 30;
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
              : withTiming(-0.1, { duration: HOLD_ITEM_TRANSFORM_DURATION }),
        },
      ],
    };
  }, [menuProps]);

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
      height: 200,
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

  const itemList = useMemo(
    () => (
      <>
        {menuProps.value.items && menuProps.value.items.length > 0
          ? menuProps.value.items.map((item: IMenuItem, index: number) => {
              return (
                <MenuItem
                  key={index}
                  item={item}
                  isLast={menuProps.value.items.length === index + 1}
                />
              );
            })
          : null}
      </>
    ),
    [menuProps]
  );

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

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
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
          {itemList}
        </Animated.View>
      </AnimatedView>
    </Animated.View>
  );
};

const Menu = React.memo(MenuComponent);

export default Menu;
