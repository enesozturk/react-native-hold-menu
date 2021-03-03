import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NavButton from './NavButton';
import { ContactsScreen, ChatScreen, SettingsScreen } from './Pages';
import StyleGuide from '../../utilities/styleGuide';
import { useAppContext } from '../../hooks/useAppContext';

import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

interface TelegramProps {}

const Telegram = ({}: TelegramProps) => {
  const { theme } = useAppContext();

  const profileMenu = useMemo(
    () => [
      {
        text: 'Add Account',
        icon: () => (
          <Icon
            name="plus"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {
          console.log('[ACTION]: Add Account');
        },
      },
      {
        text: 'Enes Ozturk',
        icon: () => (
          <Icon
            name="user"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {
          console.log('[ACTION]: Profile');
        },
      },
    ],
    [theme]
  );

  const chatMenu = useMemo(
    () => [
      {
        text: 'Add Folder',
        icon: () => (
          <Icon
            name="plus"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {
          console.log('[ACTION]: Add Folder');
        },
      },
    ],
    [theme]
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
