import React from "react";

import { StyleSheet, StatusBar } from "react-native";
import StyleGuide from "./src/components/StyleGuide";

import { NavigationContainer } from "@react-navigation/native";
import { HoldMenuProvider } from "./react-native-hold-menu";

import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from "./src/Home";
import Whatsapp from "./src/Whatsapp";
import Telegram from "./src/Telegram";
import Playground from "./src/pages/Playground";

// Components
import { HeaderPropsScrapper } from "./src/components/DetachedHeader";

const Stack = createStackNavigator();

export default function App() {

  return (
    <HoldMenuProvider>
      <StatusBar
        translucent
        showHideTransition="fade"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false,
          }}
          headerMode="screen"
        >
          <Stack.Screen
            name="Home"
            options={{
              headerShown: true,
            }}
            component={Home}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              header: HeaderPropsScrapper,
              headerBackTitleVisible: false,
              title: "Playground",
            }}
            component={Playground}
            name="Playground"
          />
          {/* <Stack.Screen
            options={{
              headerShown: true,
              header: HeaderPropsScrapper,
              headerBackTitleVisible: false,
              title: "Chat",
            }}
            component={Whatsapp}
            name="Whatsapp App"
          />
          <Stack.Screen
            options={{
              headerShown: true,
              header: HeaderPropsScrapper,
              headerBackTitleVisible: true,
              title: "Telegram",
            }}
            name="Telegram App"
            component={Telegram}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </HoldMenuProvider>
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
