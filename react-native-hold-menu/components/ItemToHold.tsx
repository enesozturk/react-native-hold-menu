import React, { useCallback, useMemo } from "react";
import { View, LayoutChangeEvent, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Menu } from "./Menu";

import { CalculateMenuHeight } from "../utils/calculations";
import { ItemToHoldProps } from "../types";
import StyleGuide from "../../src/components/StyleGuide";
import { getZIndexValue } from "../utils/constants";

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
  const MenuHeight = useMemo(() => {
    return CalculateMenuHeight(
      menuProps.items.length > 0 ? menuProps.items.length : 1
    );
  }, [menuProps]);

  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);
  const [wasActive, setWasActive] = React.useState<boolean>(false);

  const messageYPosition = useSharedValue(0);
  const parentHeight = useSharedValue(0);
  const parentPosition = useSharedValue(0);

  const messageRef = React.useRef(null);

  const isSelectedCallback = useCallback(() => {
    if (isSelected) {
      setWasActive(true);
    } else {
      setToggleMenu(false);
      messageYPosition.value = withTiming(
        0,
        { duration: 150 },
        (finished: boolean) => {
          if (finished) {
            runOnJS(setWasActive)(false);
          }
        }
      );
    }
  }, [isSelected]);

  // Effects
  React.useEffect(isSelectedCallback);

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

  const calculateNewPositionValue = () => {
    "worklet";

    const differanceOfOverflow: number = calculateDistanceOfOverflow();

    if (differanceOfOverflow > 0)
      return -1 * (differanceOfOverflow + StyleGuide.spacing * 4);
    else return 0;
  };

  const animateToPoint = useCallback((point: number, callback: () => void) => {
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
  }, []);

  const handleLongPress = useCallback(() => {
    const newPositionValue: number = calculateNewPositionValue();

    onOpenMenu();

    if (newPositionValue !== 0)
      runOnUI(animateToPoint)(newPositionValue, () => {
        setToggleMenu(true);
      });
    else setToggleMenu(true);
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
            zIndex: getZIndexValue(wasActive, isSelected) + 1,
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
          {/* <Menu
            items={menuProps.items}
            anchorPoint={menuProps.anchorPoint}
            itemHeight={parentHeight.value}
            toggle={toggleMenu}
          /> */}
        </AnimatedTouchable>
      </View>
    </>
  );
};
