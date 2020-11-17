import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavButton } from "./NavButton";
import { MaterialIcons } from "@expo/vector-icons";
import { CallsScreen, ChatScreen, PeopleScreen, SettingsScreen } from "./Pages";

const Tab = createBottomTabNavigator();

export default function BottomTabs({}) {
  return (
    <Tab.Navigator tabBar={(props) => <NavButton {...props} />}>
      <Tab.Screen
        name="People"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name={"account-circle"} color={color} />
          ),
        }}
        component={PeopleScreen}
      />
      <Tab.Screen
        name="Calls"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name={"phone"} color={color} />
          ),
        }}
        component={CallsScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name={"question-answer"} color={color} />
          ),
        }}
        component={ChatScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name={"settings"} color={color} />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
