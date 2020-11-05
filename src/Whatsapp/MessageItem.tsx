import React from "react";
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import StyleGuide from "../components/StyleGuide";
import { MessageProps } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

// React Native Hold Menu Components
import { Menu } from "../../react-native-hold-menu";
import { CalculateMenuHeight } from "../../react-native-hold-menu/utils/Calculations";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MenuItems } from "../../react-native-hold-menu/variables";

const DeviceHeight = Dimensions.get("screen").height;
const MenuHeight = CalculateMenuHeight(MenuItems.length);

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface MessageItemProps {
  message: MessageProps;
  onOpenMenu: any;
  onCloseMenu: any;
  isSelectedMessage: boolean;
  isMenuActive: boolean;
  isMenuClosed: boolean;
}

const MessageItem = ({
  message,
  onOpenMenu,
  onCloseMenu,
  isSelectedMessage,
  isMenuActive,
  isMenuClosed,
}: MessageItemProps) => {
  const messageYPosition = useSharedValue(0);
  const parentHeight = useSharedValue(0);
  const parentPosition = useSharedValue(0);

  const messageRef = React.useRef(null);
  const fromMe = message.fromMe;
  const [wasActive, setWasActive] = React.useState(isSelectedMessage);

  React.useEffect(() => {
    if (isSelectedMessage) setWasActive(true);
    if (isMenuClosed) setWasActive(false);
  }, [isMenuClosed, isSelectedMessage]);

  const handleLongPress = () => {
    onOpenMenu(message.id);
    const differanceOfOverflow: number =
      parentPosition.value + parentHeight.value + MenuHeight - DeviceHeight;
    if (differanceOfOverflow > 0) {
      messageYPosition.value = withTiming(-1 * (differanceOfOverflow * 1.5));
    }
  };

  // Animation for message wrapper component
  const parentStyle = useAnimatedStyle(() => {
    return {
      position: isSelectedMessage ? "absolute" : "relative",
      height: parentHeight.value,
      top: parentPosition.value,
    };
  });

  // Animation for message item
  const messageStyle = useAnimatedStyle(() => {
    return {
      top: messageYPosition.value,
    };
  });

  // Different styles for message if message sender or not
  const messageStylesPerMessageSender = fromMe
    ? {
        right: 0,
        borderBottomRightRadius: StyleGuide.spacing / 4,
        backgroundColor: StyleGuide.palette.whatsapp.messageBackgroundSender,
      }
    : {
        left: 0,
        borderBottomLeftRadius: StyleGuide.spacing / 4,
        backgroundColor: StyleGuide.palette.whatsapp.messageBackgroundReceiver,
      };

  React.useEffect(() => {
    if (!isSelectedMessage) messageYPosition.value = withTiming(0);
  }, [isSelectedMessage]);

  return (
    <View
      ref={messageRef}
      onLayout={(layout: LayoutChangeEvent) => {
        parentHeight.value = layout.nativeEvent.layout.height;
        parentPosition.value = layout.nativeEvent.layout.y;
      }}
      style={[
        styles.container,
        {
          alignItems: fromMe ? "flex-end" : "flex-start",
          zIndex: wasActive ? 6 : isMenuActive ? 4 : isMenuClosed ? 6 : 4,
        },
        { ...parentStyle },
      ]}
    >
      <AnimatedTouchable
        style={[
          styles.message,
          {
            ...messageStylesPerMessageSender,
          },
          { ...messageStyle },
        ]}
        activeOpacity={0.8}
        onPress={() => {
          messageYPosition.value = withTiming(0);
          onCloseMenu();
        }}
        onLongPress={handleLongPress}
      >
        <Text
          style={[styles.messageText, { textAlign: fromMe ? "right" : "left" }]}
        >
          {message.text}
        </Text>
        <View style={styles.messageTimeAndSeenContainer}>
          <Text style={styles.messageTimeText}>{message.time}</Text>
          <MaterialIcons
            name="done-all"
            size={16}
            color={StyleGuide.palette.whatsapp.seenCheckColor}
          />
        </View>
        {parentHeight.value > 0 && (
          <Menu
            itemHeight={parentHeight.value}
            toggle={isSelectedMessage && isMenuActive}
            anchorPoint={fromMe ? "top-right" : "top-left"}
          />
        )}
      </AnimatedTouchable>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
    marginTop: StyleGuide.spacing,
  },
  message: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "80%",
    paddingHorizontal: StyleGuide.spacing,
    paddingVertical: StyleGuide.spacing,
    borderRadius: StyleGuide.spacing,
    shadowColor: "rgba(0, 0, 0, .2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 120,
  },
  messageText: {
    ...StyleGuide.typography.body,
    color: StyleGuide.palette.whatsapp.messageText,
    textAlign: "center",
  },
  messageTimeAndSeenContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  messageTimeText: {
    marginRight: StyleGuide.spacing / 2,
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
});
