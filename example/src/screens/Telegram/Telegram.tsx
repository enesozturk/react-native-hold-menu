import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavButton from './NavButton';
import { ContactsScreen, ChatScreen, SettingsScreen } from './Pages';
import StyleGuide from '../../utilities/styleGuide';
import { useAppContext } from '../../hooks/useAppContext';

const Tab = createBottomTabNavigator();

interface TelegramProps {}

const Telegram = ({}: TelegramProps) => {
  const { theme } = useAppContext();

  const profileMenu = useMemo(
    () => [
      {
        text: 'Add Account',
        icon: 'plus',
        onPress: () => {
          console.log('[ACTION]: Add Account');
        },
      },
      {
        text: 'Enes Ozturk',
        icon: 'user',
        onPress: () => {
          console.log('[ACTION]: Profile');
        },
      },
    ],
    []
  );

  const chatMenu = useMemo(
    () => [
      {
        text: 'Add Folder',
        icon: 'plus',
        onPress: () => {
          console.log('[ACTION]: Add Folder');
        },
      },
    ],
    []
  );

  const themeStyles = useMemo(() => {
    return {
      sceneContainer: {
        backgroundColor: StyleGuide.palette.telegram[theme].background,
      },
      tabBarStyle: {
        backgroundColor: StyleGuide.palette[theme].secondary,
        borderTopColor: StyleGuide.palette[theme].secondary,
        paddingTop: StyleGuide.spacing / 2,
      },
    };
  }, [theme]);

  return (
    <>
      <Tab.Navigator
        sceneContainerStyle={themeStyles.sceneContainer}
        tabBarOptions={{
          style: themeStyles.tabBarStyle,
        }}
      >
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
                menuItems={chatMenu}
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
                menuItems={profileMenu}
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
