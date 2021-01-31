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
import { BlurView } from "@react-native-community/blur";

import { MenuItem } from "./MenuItem";
import { HOLD_ITEM_TRANSFORM_DURATION } from "../../constants";
import { WINDOW_WIDTH } from "../../../src/constants";

import styles from './styles'
import { HoldMenuContext } from "../provider";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Menu = ({
  items,
  longPressGestureState,
  itemHeight,
  itemWidth,
  anchorPosition = "top-center",
  menuStyles = {},
}: MenuProps) => {
  const [state, dispatch] = React.useContext(HoldMenuContext)

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

  const topValue = React.useMemo(() => {
    return anchorPosition.split("-")[0] == "top"
      ? (itemHeight || 0) + StyleGuide.spacing
      : -1 * (MenuHeight + StyleGuide.spacing);
  }, [anchorPosition, itemHeight, items]);

  const Translate = MenuAnimationAnchor(anchorPosition, (itemWidth || 0));

  const messageStyles = useAnimatedStyle(() => {
    const isAnimationActive = longPressGestureState.value == State.ACTIVE;
    const DELAY_DURATION_FOR_MENU_SCALE = HOLD_ITEM_TRANSFORM_DURATION / 2

    // withDelay not prefered when delay is zero because it may cause a bug
    const menuScaleAnimation = () => isAnimationActive ?
      withDelay(DELAY_DURATION_FOR_MENU_SCALE, withTiming(isAnimationActive ? 1 : 0, { duration: HOLD_ITEM_TRANSFORM_DURATION })) :
      withTiming(isAnimationActive ? 1 : 0, { duration: HOLD_ITEM_TRANSFORM_DURATION })

    return {
      backgroundColor: state.theme == "light" ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.2)',
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
  }, [state]);

  return (
    <View style={[styles.menuWrapper, { left: 0, top: topValue, width: itemWidth }]}>
      <AnimatedBlurView
        blurType={state.theme}
        blurAmount={50}
        style={[
          styles.menuContainer,
          { height: MenuHeight, top: 0, ...leftOrRight, },
          { ...messageStyles },
        ]}
      >
        {items && items.length > 0 ? (
          items.map((item, index) => {
            return <MenuItem key={index} item={item} isLast={items.length == index + 1} />;
          })
        ) : (<MenuItem item={{ title: "Empty List", icon: null, onPress: () => { } }} />)}
      </AnimatedBlurView>
    </View>
  );
};



export default Menu