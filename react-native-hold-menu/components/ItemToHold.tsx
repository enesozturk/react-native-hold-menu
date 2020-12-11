import React, { useCallback } from "react";
import { View, LayoutChangeEvent, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Menu } from "./Menu";

import { CalculateMenuHeight } from "../utils/Calculations";
import { ItemToHoldProps } from "../types";
import StyleGuide from "../../src/components/StyleGuide";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ItemToHold = ({
  containerProps,
  onOpenMenu,
  onCloseMenu,
  isSelected,
  menuProps,
  children,
  containerStyle = {},
  wrapperStyle = {},
}: ItemToHoldProps) => {
  const MenuHeight = CalculateMenuHeight(
    menuProps.items.length > 0 ? menuProps.items.length : 1
  );

  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);
  const [toggleBackdrop, setToggleBackdrop] = React.useState<boolean>(false);
  const [wasActive, setWasActive] = React.useState<boolean>(false);

  const messageYPosition = useSharedValue(0);
  const parentHeight = useSharedValue(0);
  const parentPosition = useSharedValue(0);

  const messageRef = React.useRef(null);

  // Effects
  React.useEffect(() => {
    if (isSelected) {
      setWasActive(true);
      setToggleMenu(true);
    } else {
      messageYPosition.value = withTiming(
        0,
        { duration: 150 },
        (finished: boolean) => {
          if (finished) {
            runOnJS(setToggleMenu)(false);
            runOnJS(setToggleBackdrop)(false);
            runOnJS(setWasActive)(false);
          }
        }
      );
    }
  }, [isSelected]);

  /** isMenuOnTop
   * If the context menu is opening from bottom to top,
   * it means that the user wants to open it above the parent item,
   * that is why MenuHeight will be negative on calculation of the now position of parent item
   */
  const isMenuOnTop =
    menuProps && menuProps.anchorPoint
      ? menuProps.anchorPoint.split("-")[0] == "bottom"
      : false;

  const calculateDistanceOfOverflow = () => {
    "worklet";
    const differanceOfOverflow: number =
      parentPosition.value +
      parentHeight.value +
      (isMenuOnTop ? -1 * MenuHeight : MenuHeight) -
      (containerProps.height + containerProps.scrollY);
    return differanceOfOverflow;
  };

  const calculateNewPositionValue = (distance: number) => {
    "worklet";
    return -1 * (distance + StyleGuide.spacing * 4);
  };

  const animateToPoint = useCallback(
    (point: number, callback: () => void) => {
      "worklet";
      messageYPosition.value = withTiming(
        point,
        { duration: 150 },
        (finished: boolean) => {
          if (finished) {
            runOnJS(callback)();
          }
        }
      );
    },
    [containerProps]
  );

  const handleLongPress = useCallback(() => {
    const differanceOfOverflow: number = calculateDistanceOfOverflow();
    const newPositionValue: number = calculateNewPositionValue(
      differanceOfOverflow
    );

    onOpenMenu();
    setToggleBackdrop(true);
    if (differanceOfOverflow > 0) {
      runOnUI(animateToPoint)(newPositionValue, () => {
        setToggleMenu(false);
      });
    } else onOpenMenu();
  }, [containerProps]);

  /**
   * Animation for parent component of item that you holding to open context menu
   */
  const parentStyle = useAnimatedStyle(() => {
    return {
      position: isSelected ? "absolute" : "relative",
      height: parentHeight.value,
      top: parentPosition.value,
    };
  });

  /**
   * Animation for item that you holding to open context menu
   */
  const itemStyle = useAnimatedStyle(() => {
    return {
      top: messageYPosition.value,
    };
  });

  return (
    <>
      <View
        ref={messageRef}
        onLayout={(layout: LayoutChangeEvent) => {
          parentHeight.value = layout.nativeEvent.layout.height;
          parentPosition.value = layout.nativeEvent.layout.y;
        }}
        style={[
          containerStyle,
          {
            zIndex: wasActive || isSelected ? 15 : 6,
          },
          { ...parentStyle },
        ]}
      >
        <AnimatedTouchable
          style={[wrapperStyle, { ...itemStyle }]}
          activeOpacity={0.8}
          onPress={onCloseMenu}
          onLongPress={handleLongPress}
        >
          {children}
        </AnimatedTouchable>
        {/* <Menu
          items={menuProps.items}
          anchorPoint={menuProps.anchorPoint}
          itemHeight={parentHeight.value}
          toggle={toggleMenu}
        /> */}
      </View>
    </>
  );
};
