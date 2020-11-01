import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import StyleGuide from "../components/StyleGuide";
import Menu from "./Menu";
import { MessageProps } from "../types";
import { MaterialIcons } from "@expo/vector-icons";

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
  const fromMe = message.fromMe;
  const [wasActive, setWasActive] = React.useState(isSelectedMessage);

  React.useEffect(() => {
    if (isSelectedMessage) setWasActive(true);
    if (isMenuClosed) setWasActive(false);
  }, [isMenuClosed, isSelectedMessage]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCloseMenu}
        style={[
          styles.container,
          {
            alignItems: fromMe ? "flex-end" : "flex-start",
            zIndex: wasActive ? 6 : isMenuActive ? 4 : isMenuClosed ? 6 : 4,
          },
        ]}
      >
        <>
          <TouchableOpacity
            style={[
              styles.message,
              {
                backgroundColor: fromMe
                  ? StyleGuide.palette.whatsapp.messageBackgroundSender
                  : StyleGuide.palette.whatsapp.messageBackgroundReceiver,
                borderBottomRightRadius: StyleGuide.spacing / (fromMe ? 4 : 1),
                borderBottomLeftRadius: StyleGuide.spacing / (fromMe ? 1 : 4),
              },
            ]}
            activeOpacity={0.8}
            onPress={onCloseMenu}
            onLongPress={() => onOpenMenu(message.id)}
          >
            <Text
              style={[
                styles.messageText,
                { textAlign: fromMe ? "right" : "left" },
              ]}
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
          </TouchableOpacity>
          <Menu
            toggle={isSelectedMessage && isMenuActive}
            rtl={fromMe ? true : false}
          />
        </>
      </TouchableOpacity>
    </>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
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
    zIndex: 4,
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
