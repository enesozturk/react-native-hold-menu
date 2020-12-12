import React, { useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  LayoutChangeEvent,
  StatusBar,
} from "react-native";

import StyleGuide from "../components/StyleGuide";
import { MaterialIcons } from "@expo/vector-icons";

import { Messages, MessageStyles } from "./variables";

// React Native Hold Menu Components
import { ItemToHold, MenuBackDrop } from "../../react-native-hold-menu";
import { getConstants } from "../../react-native-hold-menu/utils/constants";
import Animated from "react-native-reanimated";
import { useControls } from "../hooks/UseControls";
import { DetachedHeader } from "../components/DetachedHeader";
import { MessageProps } from "./types";

interface ChatPageProps {}

const ChatPage = ({}: {}) => {
  const [selectedMessage, setSelectedMessage] = React.useState<number>(0);
  const { controlsStyles, setControlsHidden } = useControls();

  const handleOpenMenu = (messageId: number) => {
    setControlsHidden(true);
    StatusBar.setHidden(true);
    setSelectedMessage(messageId);
  };

  const handleCloseMenu = useCallback(() => {
    setSelectedMessage(0);
    setControlsHidden(false);
    StatusBar.setHidden(false);
  }, [selectedMessage]);

  const [scrollY, setScrollY] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);

  const { APPBAR_HEIGHT, STATUSBAR_HEIGHT } = getConstants();

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
          },
        ]}
        scrollEnabled={!selectedMessage}
        scrollEventThrottle={50}
        onLayout={(layout: LayoutChangeEvent) => {
          setContainerHeight(layout.nativeEvent.layout.height);
        }}
        onScroll={(event) => {
          setScrollY(event.nativeEvent.contentOffset.y);
        }}
      >
        {Messages.map((message, index) => {
          return (
            <ItemToHold
              containerProps={{
                scrollY: scrollY,
                height: containerHeight,
              }}
              key={index}
              onOpenMenu={() => handleOpenMenu(message.id)}
              onCloseMenu={handleCloseMenu}
              isSelected={selectedMessage == message.id}
              menuProps={{
                items: [
                  { id: 1, title: "Add", icon: "help-circle" },
                  { id: 1, title: "Add 1", icon: "help-circle" },
                  { id: 1, title: "Add 2", icon: "help-circle" },
                ],
                anchorPoint: message.fromMe ? "top-right" : "top-left",
              }}
              containerStyle={{
                ...styles.messageContainer,
                ...{ alignItems: message.fromMe ? "flex-end" : "flex-start" },
              }}
              wrapperStyle={{
                ...styles.message,
                ...MessageStyles(message.fromMe),
              }}
            >
              <Text style={styles.messageText}>{message.text}</Text>
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
        })}
        <MenuBackDrop
          toggle={selectedMessage > 0}
          onCloseMenu={handleCloseMenu}
        />
      </ScrollView>

      <Animated.View style={controlsStyles}>
        <DetachedHeader.Container>
          <DetachedHeader />
        </DetachedHeader.Container>
      </Animated.View>
    </>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: StyleGuide.palette.whatsapp.chatBackground,
    paddingHorizontal: StyleGuide.spacing,
    zIndex: 10,
  },
  messageContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
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
    textAlign: "left",
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
