import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavButton } from "./NavButton";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="People"
        options={{
          tabBarButton: () => (
            <NavButton active={true} title="People" icon="user" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Calls"
        options={{
          tabBarButton: () => (
            <NavButton active={false} title="Calls" icon="phone-call" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarButton: () => (
            <NavButton active={false} title="Chat" icon="message-circle" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarButton: () => (
            <NavButton active={false} title="Settings" icon="settings" />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
