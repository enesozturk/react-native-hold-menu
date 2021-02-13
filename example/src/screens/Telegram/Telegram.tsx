import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavButton from './NavButton';
import { ContactsScreen, ChatScreen, SettingsScreen } from './Pages';
import { HoldItem, Backdrop } from 'react-native-hold-menu';
import { MENU_ITEMS_CHAT, MENU_ITEMS_SETTINGS } from './constants';

const Tab = createBottomTabNavigator();

interface TelegramProps {}

const Telegram = ({}: TelegramProps) => {
  const active = useSharedValue<number>(0);

  const handleOnActivate = (itemId: number) => {
    active.value = itemId;
  };

  const handleOnDeactivate = () => {
    active.value = 0;
  };

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Calls"
          options={{
            tabBarButton: props => (
              <NavButton
                id={1}
                menuItems={[]}
                active={active}
                onActive={handleOnActivate}
                title="Calls"
                {...props}
                icon="users"
              />
            ),
          }}
          component={ContactsScreen}
        />
        <Tab.Screen
          name="Chat"
          options={{
            tabBarButton: props => (
              <NavButton
                id={2}
                menuItems={MENU_ITEMS_SETTINGS}
                active={active}
                onActive={handleOnActivate}
                title="Chat"
                {...props}
                icon="message-square"
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
                id={3}
                menuItems={MENU_ITEMS_SETTINGS}
                active={active}
                onActive={handleOnActivate}
                title="Settings"
                {...props}
                icon="settings"
              />
            ),
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
      <Backdrop activeItem={active} handleDeactivate={handleOnDeactivate} />
    </>
  );
};

export default Telegram;

const styles = StyleSheet.create({});
