import React from "react";

import Icons from "react-native-vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CallsScreen, ChatScreen, PeopleScreen, SettingsScreen } from "./Pages";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ }) {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="People"
        options={{
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="users" color={color} />
          ),
        }}
        component={PeopleScreen}
      />
      <Tab.Screen
        name="Calls"
        options={{
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="phone" color={color} />
          ),
        }}
        component={CallsScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="message-square" color={color} />
          ),
        }}
        component={ChatScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="settings" color={color} />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
