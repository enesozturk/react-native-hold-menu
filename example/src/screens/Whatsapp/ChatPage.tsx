import React, { useMemo } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import { MessageStyles } from './variables';
import { mockWhatsAppData } from '../../utilities/data';

// React Native Hold Menu Components
import { HoldItem } from 'react-native-hold-menu';
import * as Haptics from 'expo-haptics';

export const MenuItems = [
  {
    title: 'Edit',
    icon: null,
    onPress: () => {
      console.log('EDIT ACTION');
    },
  },
  {
    title: 'Delete',
    icon: null,
    onPress: () => {
      console.log('DELETE ACTION');
    },
  },
];

const MessageItemComponent = ({ message }: { message: any }) => {
  const handleOnActivate = () => {
    Haptics.impactAsync();
  };

  return (
    <View
      style={[
        styles.messageContainer,
        { alignItems: message.fromMe ? 'flex-end' : 'flex-start' },
      ]}
    >
      <HoldItem
        id={message.id.toString()}
        styles={{ maxWidth: '80%' }}
        items={MenuItems}
        onActivate={handleOnActivate}
      >
        <View style={[styles.message, { ...MessageStyles(message.fromMe) }]}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </HoldItem>
    </View>
  );
};

const MessageItem = React.memo(MessageItemComponent);

const ChatPage = () => {
  const data = useMemo(() => mockWhatsAppData(100), []);

  const messageItem = (message: any) => {
    return <MessageItem message={message} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => messageItem(item)}
      contentContainerStyle={{ paddingHorizontal: StyleGuide.spacing }}
      inverted
    />
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: StyleGuide.palette.whatsapp.chatBackground,
    paddingHorizontal: StyleGuide.spacing,
    zIndex: 10,
  },
  messageContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: StyleGuide.spacing,
  },
  message: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: StyleGuide.spacing,
    paddingVertical: StyleGuide.spacing,
    borderRadius: StyleGuide.spacing,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageText: {
    ...StyleGuide.typography.body,
    color: StyleGuide.palette.whatsapp.messageText,
    textAlign: 'left',
  },
  messageTimeAndSeenContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageTimeText: {
    marginRight: StyleGuide.spacing / 2,
    textAlign: 'right',
    fontSize: 12,
    color: 'gray',
  },
});
