import * as React from "react";
import { View } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

import StyleGuide from "../StyleGuide";
import { MenuProps } from "../../types";
import {
  CalculateMenuHeight,
  MenuAnimationAnchor,
} from "../../utils/calculations";

import { MenuItem } from "./MenuItem";
import { HOLD_ITEM_TRANSFORM_DURATION } from "../../constants";
import { WINDOW_WIDTH } from "../../../src/constants";

import styles from './styles'

const Menu = ({
  items,
  longPressGestureState,
  itemHeight,
  itemWidth,
  anchorPosition = "top-center",
  menuStyles = {},
}: MenuProps) => {
  const MenuHeight = CalculateMenuHeight(items.length)

  const leftOrRight = React.useMemo(() => {
    return anchorPosition
      ? anchorPosition.includes("right")
        ? { right: 0 }
        : anchorPosition.includes("left")
          ? { left: 0 }
          : { left: -(WINDOW_WIDTH / 2) + (itemWidth || 0) / 2 }
      : {};
  }, [anchorPosition]);
  console.log("ANCHOR POINT", anchorPosition)

  const topValue = React.useMemo(() => {
    return anchorPosition.split("-")[0] == "top"
      ? (itemHeight || 0) + StyleGuide.spacing
      : -1 * (MenuHeight + StyleGuide.spacing * 2);
  }, [anchorPosition, itemHeight, items]);

  const Translate = MenuAnimationAnchor(anchorPosition, (itemWidth || 0));

  const messageStyles = useAnimatedStyle(() => {
    const isAnimationActive = longPressGestureState.value == State.ACTIVE;
    const DELAY_DURATION_FOR_SCALE = isAnimationActive ? HOLD_ITEM_TRANSFORM_DURATION / 2 : 20

    const DELAY_DURATION_FOR_MENU_SCALE = isAnimationActive ? DELAY_DURATION_FOR_SCALE + HOLD_ITEM_TRANSFORM_DURATION : 10
    const menuScaleAnimation = () => withDelay(DELAY_DURATION_FOR_MENU_SCALE, withTiming(isAnimationActive ? 1 : 0, { duration: HOLD_ITEM_TRANSFORM_DURATION }))

    return {
      transform: [
        { translateX: Translate.begginingTransformations.translateX },
        { translateY: Translate.begginingTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: Translate.endingTransformations.translateX },
        { translateY: Translate.endingTransformations.translateY },
      ],
    };
  });

  return (
    <View
      style={[styles.menuWrapper, { left: 0, top: topValue, width: itemWidth }]}
    >
      <Animated.View
        style={[
          styles.menuContainer,
          { height: MenuHeight, top: 0, ...leftOrRight, ...menuStyles },
          { ...messageStyles },
        ]}
      >
        {items && items.length > 0 ? (
          items.map((item, index) => {
            return <MenuItem key={index} item={item} />;
          })
        ) : (<MenuItem item={{ title: "Empty List", icon: null, onPress: () => { } }} />)}
      </Animated.View>
    </View>
  );
};



export default Menu