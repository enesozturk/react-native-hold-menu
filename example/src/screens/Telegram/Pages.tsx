import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StyleGuide from '../../utilities/styleGuide';

export function ContactsScreen() {
  return (
    <View style={styles.container}>
      <Text>Contacts</Text>
    </View>
  );
}
export function CallsScreen() {
  return (
    <View style={styles.container}>
      <Text>Calls</Text>
    </View>
  );
}
export function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
}

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: StyleGuide.dimensionWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: StyleGuide.spacing * 2,
    zIndex: 6,
  },
});
