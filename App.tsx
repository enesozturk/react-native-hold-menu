import React from "react";

import { StyleSheet, StatusBar } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";
import { useHoldMenuInit } from "./react-native-hold-menu";

export default function App() {
  useHoldMenuInit();
  return (
    <>
      <StatusBar
        translucent
        showHideTransition="fade"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <Navigator />
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
