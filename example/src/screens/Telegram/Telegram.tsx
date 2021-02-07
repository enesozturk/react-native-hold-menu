import React from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/Feather";
import { CallsScreen, ChatScreen, PeopleScreen, SettingsScreen } from "./Pages";

const Tab = createBottomTabNavigator();

interface TelegramProps { }

const Telegram = ({ }: TelegramProps) => {
  const [activeRoute, setActiveRoute] = React.useState<string>("");

  const handleOpenMenu = (routeKey: string) => {
    setActiveRoute(routeKey);
  };

  const handleCloseMenu = () => {
    setActiveRoute("");
  };

  return (
    <Tab.Navigator>
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
};

export default Telegram;

const styles = StyleSheet.create({});
