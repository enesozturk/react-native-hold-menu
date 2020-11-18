import React from "react";
import {
  View,
  LayoutChangeEvent,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Menu } from "./Menu";

import { CalculateMenuHeight } from "../utils/Calculations";
import { MenuItems } from "../../react-native-hold-menu/variables";
import { MenuProps } from "../types";
import StyleGuide from "../../src/components/StyleGuide";

const DeviceHeight = Dimensions.get("screen").height;
const MenuHeight = CalculateMenuHeight(MenuItems.length);

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ItemToHoldProps {
  /**
   * You are going to need pass this prop to the parent of the hold items(s) container because;
   * when you use it in different views, it is needed to know parent height and scroll value
   * to calculate correct new positions of the holded item.
   */
  containerProps: {
    height: number;
    scrollY: number;
  };

  /**
   * Function that you want to call on hold the item. You are going to need pass handler to set context menu state on. Check out the examples.
   */
  onOpenMenu: any;

  /**
   * Function that you want to call on close the context menu. You are going to need pass handler to set context menu state off. Check out the examples.
   */
  onCloseMenu: any;

  /**
   * ItemToHold needs to know if context menu should open or not.
   */
  isSelected: boolean;

  /**
   * Menu props is optional but you probably need to use it to set anchor point of context menu openning from. From top-right, top-left, bottom-center etc.
   */
  menuProps?: MenuProps;

  /**
   * What do you want to render inside the hold item?
   */
  children: React.ReactNode;

  /**
   * To override the container of item(s) to hold
   */
  containerStyle?: ViewStyle | ViewStyle[];

  /**
   * To override the wrapper (parent) of item to hold
   */
  wrapperStyle?: ViewStyle | ViewStyle[];
}

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
  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);
  const [toggleBackdrop, setToggleBackdrop] = React.useState<boolean>(false);
  const [wasActive, setWasActive] = React.useState<boolean>(false);

  const messageYPosition = useSharedValue(0);
  const parentHeight = useSharedValue(0);
  const parentPosition = useSharedValue(0);

  const messageRef = React.useRef(null);

  React.useEffect(() => {
    if (isSelected) setWasActive(true);
    else {
      setToggleMenu(false);
      messageYPosition.value = withTiming(
        0,
        { duration: 150 },
        (finished: boolean) => {
          if (finished) {
            setToggleBackdrop(false);
            setWasActive(false);
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

  const handleLongPress = () => {
    onOpenMenu();

    const differanceOfOverflow: number =
      parentPosition.value +
      parentHeight.value +
      (isMenuOnTop ? -1 * MenuHeight : MenuHeight) -
      (containerProps.height + containerProps.scrollY);
    const newPositionValue =
      -1 * (differanceOfOverflow + StyleGuide.spacing * 4);

    setToggleBackdrop(true);
    if (differanceOfOverflow > 0)
      messageYPosition.value = withTiming(
        newPositionValue,
        { duration: 150 },
        (finished: boolean) => {
          if (finished) setToggleMenu(true);
        }
      );
    else setToggleMenu(true);
  };

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
          {parentHeight.value > 0 && (
            <Menu
              anchorPoint={menuProps?.anchorPoint}
              itemHeight={parentHeight.value}
              toggle={toggleMenu}
            />
          )}
        </AnimatedTouchable>
      </View>
    </>
  );
};
