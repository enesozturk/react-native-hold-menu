import React from "react";

import { StyleSheet } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";
import BackdropContainer from "./src/components/BackdropContainer";
import { Provider } from "react-redux";
import { store } from "./Store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
        <BackdropContainer />
      </NavigationContainer>
    </Provider>
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
