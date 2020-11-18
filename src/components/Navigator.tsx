import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Home";
import Whatsapp from "../Whatsapp";
import Telegram from "../Telegram";

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: "React Native Hold Menu",
        }}
        component={Home}
      />
      <Stack.Screen name="Whatsapp" component={Whatsapp} />
      <Stack.Screen name="Telegram" component={Telegram} />
    </Stack.Navigator>
  );
}
