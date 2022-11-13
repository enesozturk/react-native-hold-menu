import React, { useState, useMemo, useCallback } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import Home, { ToggleThemeButton } from './screens/Home';
import Playground from './screens/Playground';
import Whatsapp from './screens/Whatsapp';
import Telegram from './screens/Telegram';
import Clubhouse, {
  ClubhouseNavButtonLeft,
  ClubhouseNavButtonRight,
} from './screens/Clubhouse';

// Components
import { HoldMenuProvider } from 'react-native-hold-menu';
import FeatherIcon from '@expo/vector-icons/Feather';

// Utils
import { AppContext, IAppContext } from './context/internal';
import StyleGuide from './utilities/styleGuide';

const Stack = createStackNavigator();

const App = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [state, setState] = useState<IAppContext>({
    theme: 'light',
    toggleTheme: () => {},
  });

  const toggleTheme = useCallback(() => {
    setState({ ...state, theme: state.theme === 'light' ? 'dark' : 'light' });
  }, [state]);

  const appContextVariables = useMemo(
    () => ({
      ...state,
      toggleTheme,
    }),
    [state, toggleTheme]
  );

  const headerOptions = useMemo(() => {
    return {
      headerStyle: {
        backgroundColor: StyleGuide.palette[state.theme].backgroundColor,
        shadowColor: StyleGuide.palette[state.theme].secondary,
      },
      headerTintColor: StyleGuide.palette[state.theme].color,
    };
  }, [state]);

  const onOpen = useCallback(() => {
    console.log('App onOpen')
  }, []);

  const onClose = useCallback(() => {
    console.log('App onClose')
  }, []);

  return (
    <>
      <AppContext.Provider value={appContextVariables}>
        <StatusBar
          barStyle={state.theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <HoldMenuProvider
          iconComponent={FeatherIcon}
          theme={state.theme}
          safeAreaInsets={safeAreaInsets}
          onOpen={onOpen}
          onClose={onClose}
        >
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              headerMode="screen"
              screenOptions={{
                headerRight: () => <ToggleThemeButton theme={state.theme} />,
              }}
            >
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: 'React Native Hold Menu',
                  ...headerOptions,
                }}
              />
              <Stack.Screen
                name="Playground"
                options={{ ...headerOptions }}
                component={Playground}
              />
              <Stack.Screen
                name="Whatsapp"
                options={{ ...headerOptions }}
                component={Whatsapp}
              />
              <Stack.Screen
                name="Telegram"
                options={{ ...headerOptions }}
                component={Telegram}
              />
              <Stack.Screen
                name="Clubhouse"
                options={({ navigation: { goBack } }) => ({
                  headerStyle: {
                    backgroundColor: StyleGuide.palette.clubhouse.background,
                    shadowColor: StyleGuide.palette.clubhouse.background,
                    height: StyleGuide.spacing * 12,
                  },
                  headerTintColor: StyleGuide.palette.light.color,
                  headerLeft: () => <ClubhouseNavButtonLeft goBack={goBack} />,
                  headerRight: () => <ClubhouseNavButtonRight />,
                })}
                component={Clubhouse}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </HoldMenuProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
