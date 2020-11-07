import React from "react";
import { StyleSheet, View, Text } from "react-native";

import StyleGuide from "../components/StyleGuide";
import { MessageProps } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

// React Native Hold Menu Components
import { Menu } from "../../react-native-hold-menu";
import { useSharedValue } from "react-native-reanimated";
import ItemToHold from "../../react-native-hold-menu/components/ItemToHold";

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
  isMenuClosed,
  isSelectedMessage,
  isMenuActive,
}: MessageItemProps) => {
  const fromMe = message.fromMe;

  // Different styles for message if message sender or not
  const messageStyles = fromMe
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

  return (
    <ItemToHold
      key={message.id}
      onOpenMenu={onOpenMenu}
      onCloseMenu={onCloseMenu}
      isSelectedMessage={isSelectedMessage}
      isMenuActive={isMenuActive}
      isMenuClosed={isMenuClosed}
      containerStyle={styles.container}
      menuProps={{ anchorPoint: "top-left" }}
      wrapperStyle={[styles.message, { ...messageStyles }]}
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
    </ItemToHold>
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
