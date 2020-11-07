import React from "react";
import {
  StyleSheet,
  View,
  LayoutChangeEvent,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Menu } from "../../react-native-hold-menu";
import { CalculateMenuHeight } from "../../react-native-hold-menu/utils/Calculations";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MenuItems } from "../../react-native-hold-menu/variables";
import { MenuProps } from "../types";

const DeviceHeight = Dimensions.get("screen").height;
const MenuHeight = CalculateMenuHeight(MenuItems.length);

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ItemToHoldProps {
  onOpenMenu: any;
  onCloseMenu: any;
  setToggleHoldMenu: any;
  isSelected: boolean;
  isMenuClosed: boolean;
  menuProps?: MenuProps;
  children: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  wrapperStyle?: ViewStyle | ViewStyle[];
}

export const ItemToHold = ({
  onOpenMenu,
  onCloseMenu,
  setToggleHoldMenu,
  isSelected,
  isMenuClosed,
  menuProps,
  children,
  containerStyle = {},
  wrapperStyle = {},
}: ItemToHoldProps) => {
  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);

  const messageYPosition = useSharedValue(0);
  const parentHeight = useSharedValue(0);
  const parentPosition = useSharedValue(0);

  const messageRef = React.useRef(null);

  React.useEffect(() => {
    if (isSelected) {
      setToggleMenu(true);
    } else setToggleMenu(false);
  }, [isMenuClosed, isSelected]);

  const handleLongPress = () => {
    onOpenMenu();

    const differanceOfOverflow: number =
      parentPosition.value + parentHeight.value + MenuHeight - DeviceHeight;
    setToggleHoldMenu(true);
    if (differanceOfOverflow > 0) {
      messageYPosition.value = withTiming(
        -1 * (differanceOfOverflow * 1.5),
        { duration: 150 },
        (finished: boolean) => {
          if (finished && onOpenMenu) setToggleMenu(true);
        }
      );
    } else {
      if (onOpenMenu) setToggleMenu(true);
    }
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

  React.useEffect(() => {
    if (!isSelected) messageYPosition.value = withTiming(0);
  }, [isSelected]);

  return (
    <View
      ref={messageRef}
      onLayout={(layout: LayoutChangeEvent) => {
        parentHeight.value = layout.nativeEvent.layout.height;
        parentPosition.value = layout.nativeEvent.layout.y;
      }}
      style={[
        containerStyle,
        {
          zIndex: isSelected ? 15 : 6,
        },
        { ...parentStyle },
      ]}
    >
      <AnimatedTouchable
        style={[wrapperStyle, { ...itemStyle }]}
        activeOpacity={0.8}
        onPress={() => {
          messageYPosition.value = withTiming(0);
          onCloseMenu();
        }}
        onLongPress={handleLongPress}
      >
        {children}
        {parentHeight.value > 0 && (
          <Menu
            itemHeight={parentHeight.value}
            toggle={toggleMenu}
            {...menuProps}
          />
        )}
      </AnimatedTouchable>
    </View>
  );
};
