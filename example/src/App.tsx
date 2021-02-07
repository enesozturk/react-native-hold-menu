/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Home from './screens/Home';
import Whatsapp from './screens/Whatsapp';
import Telegram from './screens/Telegram';
import Playground from './screens/Playground';

// Hold Menu
import { HoldMenuProvider } from 'react-native-hold-menu';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <HoldMenuProvider theme="light">
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="screen">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'React Native Hold Menu',
              }}
            />
            <Stack.Screen name="Playground" component={Playground} />
            <Stack.Screen name="Whatsapp" component={Whatsapp} />
            <Stack.Screen name="Telegram" component={Telegram} />
          </Stack.Navigator>
        </NavigationContainer>
      </HoldMenuProvider>
    </>
  );
};

export default App;
