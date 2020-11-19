import React from "react";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";

import Home from "../Home";
import Whatsapp from "../Whatsapp";
import Telegram from "../Telegram";
import { HeaderPropsScrapper } from "./DetachedHeader";

const Stack = createStackNavigator();

export default function () {
  return (
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
          headerTitle: "React Native Hold Menu",
        }}
        component={Home}
      />
      <Stack.Screen
        options={{
          header: HeaderPropsScrapper,
          headerBackTitleVisible: false,
          title: "Whatsapp",
        }}
        component={Whatsapp}
        name="Whatsapp"
      />
      <Stack.Screen
        options={{
          header: HeaderPropsScrapper,
          headerBackTitleVisible: false,
          title: "Telegram",
        }}
        name="Telegram"
        component={Telegram}
      />
    </Stack.Navigator>
  );
}
