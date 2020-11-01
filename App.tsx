import { StatusBar } from "expo-status-bar";
import React from "react";

import { StyleSheet, View } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import ChatPage from "./src/Whatsapp";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ChatPage />
    </View>
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
