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
  id: number;
  onOpenMenu: any;
  onCloseMenu: any;
  isSelected: boolean;
  setIsMenuClosed?: any;
  menuProps?: MenuProps;
  children: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  wrapperStyle?: ViewStyle | ViewStyle[];
}

export const ItemToHold = ({
  id,
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

  const handleLongPress = () => {
    onOpenMenu();

    const differanceOfOverflow: number =
      parentPosition.value +
      parentHeight.value +
      MenuHeight -
      (DeviceHeight + id);
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

  // Animation for message wrapper component
  const parentStyle = useAnimatedStyle(() => {
    return {
      position: isSelected ? "absolute" : "relative",
      height: parentHeight.value,
      top: parentPosition.value,
    };
  });

  // Animation for message item
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
