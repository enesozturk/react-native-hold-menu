import { StatusBar } from "expo-status-bar";
import React from "react";

import { StyleSheet, View } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import ChatPage from "./src/Whatsapp";
import Telegram from "./src/Telegram";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* <View style={styles.container}>
        <StatusBar style="auto" />
        <ChatPage />
      </View> */}
        <Telegram />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
