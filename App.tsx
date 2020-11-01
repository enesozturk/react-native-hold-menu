import { StatusBar } from "expo-status-bar";
import React from "react";

import { StyleSheet, View } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import HoldMenu from "./react-native-hold-menu";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HoldMenu />
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
