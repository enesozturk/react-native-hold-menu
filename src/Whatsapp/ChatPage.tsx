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

import { MessageStyles } from "./variables";
import { mockWhatsAppData } from "../utilities/data";

// React Native Hold Menu Components
import {
  ItemToHold,
  MenuBackDrop,
  FlatList,
} from "../../react-native-hold-menu";
import { getConstants } from "../../react-native-hold-menu/utils/constants";

import Animated from "react-native-reanimated";
import { useControls } from "../hooks/UseControls";
import { DetachedHeader } from "../components/DetachedHeader";

interface ChatPageProps {}

const ChatPage = ({}: {}) => {
  const [selectedMessage, setSelectedMessage] = React.useState<number>(0);
  const { controlsStyles, setControlsHidden } = useControls();

  //#region variables
  const data = useMemo(() => mockWhatsAppData(1000), []);
  //#endregion

  //#region callbacks
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
  //#endregion

  //#region renders
  const renderItem = useCallback(
    ({ item: message }) => (
      <View
        style={{
          ...styles.messageContainer,
          ...styles.message,
          ...MessageStyles(message.fromMe),
          ...{ alignSelf: message.fromMe ? "flex-end" : "flex-start" },
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
      </View>
    ),
    []
  );
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        scrollEventThrottle={16}
        windowSize={12}
        initialNumToRender={12}
        maxToRenderPerBatch={5}
      />

      <Animated.View style={controlsStyles}>
        <DetachedHeader.Container>
          <DetachedHeader />
        </DetachedHeader.Container>
      </Animated.View>
    </>
  );
  //#endregion
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
    backgroundColor: 'grey'
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
