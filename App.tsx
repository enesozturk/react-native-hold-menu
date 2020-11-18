import React from "react";

import { StyleSheet } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";

export default function App() {
  return (
    <>
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
