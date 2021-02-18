import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavButton from './NavButton';
import { ContactsScreen, ChatScreen, SettingsScreen } from './Pages';
import { MENU_ITEMS_SETTINGS } from './constants';

const Tab = createBottomTabNavigator();

interface TelegramProps {}

const Telegram = ({}: TelegramProps) => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Calls"
          options={{
            tabBarButton: props => (
              <NavButton title="Calls" icon="users" menuItems={[]} {...props} />
            ),
          }}
          component={ContactsScreen}
        />
        <Tab.Screen
          name="Chat"
          options={{
            tabBarButton: props => (
              <NavButton
                title="Chat"
                icon="message-square"
                menuItems={MENU_ITEMS_SETTINGS}
                {...props}
              />
            ),
          }}
          component={ChatScreen}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarButton: props => (
              <NavButton
                title="Settings"
                icon="settings"
                menuItems={MENU_ITEMS_SETTINGS}
                {...props}
              />
            ),
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default Telegram;

const styles = StyleSheet.create({});
