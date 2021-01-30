import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, {
  runOnJS,
  useAnimatedStyle,
  withTiming,
  withDelay,
  useSharedValue,
} from "react-native-reanimated";

import StyleGuide from "../StyleGuide";
import { MenuItemProps, MenuProps } from "../../types";
import {
  CalculateMenuHeight,
  MenuAnimationAnchor,
  MENU_WIDTH,
} from "../../utils/calculations";

import { MenuItem } from "./MenuItem";
import { HoldMenuContext } from "../provider";
import { CONTEXT_MENU_STATE } from "../../constants";
import { HOLD_ITEM_TRANSFORM_DURATION } from "../../utils/constants";

export const MENU_CONTAINER_WIDTH =
  StyleGuide.dimensionWidth - StyleGuide.spacing * 4;

const items = [
  { id: 1, title: 'X' }, { id: 2, title: 'X' }
]
const anchorPoint = "top-right"

const Menu = ({
  // items,
  itemHeight,
  // toggle,
  // anchorPoint = "top-center",
  containerStyles = {},
  menuStyles = {},
}: MenuProps) => {
  const [state, dispatch] = React.useContext(HoldMenuContext)

  const MenuHeight = CalculateMenuHeight(items.length)

  const leftOrRight = React.useMemo(() => {
    return anchorPoint
      ? anchorPoint.includes("right")
        ? { right: 0 }
        : anchorPoint.includes("left")
          ? { left: 0 }
          : { left: -MENU_WIDTH / 4 }
      : {};
  }, [anchorPoint]);

  const topValue = React.useMemo(() => {
    return anchorPoint.split("-")[0] == "top"
      ? (itemHeight || 0) + StyleGuide.spacing
      : -1 * (MenuHeight + StyleGuide.spacing * 2);
  }, [anchorPoint, itemHeight, items]);

  const Translate = MenuAnimationAnchor(anchorPoint);

  const messageStyles = useAnimatedStyle(() => {
    const isAnimationActive = state.active == CONTEXT_MENU_STATE.ACTIVE;
    const menuScaleAnimation = () => withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(isAnimationActive ? 1 : 0, { duration: 200 }))

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
      style={[
        styles.wrapper,
        {
          ...leftOrRight,
          top: topValue,
          ...containerStyles,
          // backgroundColor: 'red',
          height: 200,
          width: 200
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          { height: MenuHeight, top: 0, ...leftOrRight, ...menuStyles },
          { ...messageStyles },
        ]}
      >
        {items && items.length > 0 ? (
          items.map((item, index) => {
            return <MenuItem key={index} item={item} />;
          })
        ) : (
            <MenuItem
              item={{ id: 0, title: "Empty List", icon: "help-circle" }}
            />
          )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: MENU_CONTAINER_WIDTH,
    zIndex: 10,
  },
  container: {
    position: "absolute",
    width: MENU_WIDTH,
    borderRadius: StyleGuide.spacing * 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.common.white,
    overflow: "hidden",
    zIndex: 15,
  },
});


export default Menu