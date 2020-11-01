import React from "react";
import { View, StyleSheet } from "react-native";

import StyleGuide from "./StyleGuide";
import MenuBackDrop from "./MenuBackDrop";
import MessageItem from "./MessageItem";

import { Messages } from "../variables";

interface HoldMenuProps {}

const HoldMenu = () => {
  const [selectedMessage, setSelectedMessage] = React.useState<number>(0);
  const [isMenuClosed, setIsMenuClosed] = React.useState(false);

  const handleCloseMenu = () => {
    setSelectedMessage(0);
  };

  return (
    <View style={styles.container}>
      {Messages.map((message, index) => {
        return (
          <MessageItem
            key={index}
            message={message}
            onCloseMenu={handleCloseMenu}
            onOpenMenu={(id: number) => {
              setIsMenuClosed(false);
              setSelectedMessage(id);
            }}
            isSelectedMessage={selectedMessage == message.id}
            isMenuActive={selectedMessage > 0}
            isMenuClosed={isMenuClosed}
          />
        );
      })}
      <MenuBackDrop
        toggle={selectedMessage > 0}
        onCloseMenu={handleCloseMenu}
        setIsMenuClosed={setIsMenuClosed}
      />
    </View>
  );
};

export default HoldMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: StyleGuide.spacing * 10,
    backgroundColor: StyleGuide.palette.whatsapp.chatBackground,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingHorizontal: StyleGuide.spacing * 2,
  },
});
