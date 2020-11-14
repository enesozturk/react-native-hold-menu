import React from "react";
import { View, StyleSheet } from "react-native";

import StyleGuide from "../components/StyleGuide";

import { ItemToHold, MenuBackDrop } from "../../react-native-hold-menu";
import BottomTabs from "./BottomNavigator";

interface TelegramProps {}

const Telegram = ({}: TelegramProps) => {
  const [selectedMessage, setSelectedMessage] = React.useState<number>(0);

  return <BottomTabs />;
};

export default Telegram;

const styles = StyleSheet.create({
  container: {
    width: StyleGuide.dimensionWidth,
    backgroundColor: StyleGuide.palette.whatsapp.chatBackground,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingHorizontal: StyleGuide.spacing * 2,
    zIndex: 6,
  },
  messageContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    // backgroundColor: "red",
    marginTop: StyleGuide.spacing,
  },
});
