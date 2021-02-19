import React, { memo, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import { MessageStyles } from './variables';
import { mockWhatsAppData } from '../../utilities/data';

// React Native Hold Menu Components
import { HoldItem } from 'react-native-hold-menu';
import Animated from 'react-native-reanimated';
import { MenuItems } from '../../constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MessageItemComp = ({ message }: { message: any }) => (
  <View
    style={[
      styles.messageContainer,
      { alignItems: message.fromMe ? 'flex-end' : 'flex-start' },
    ]}
  >
    <HoldItem
      items={MenuItems}
      containerStyles={{
        position: 'relative',
        maxWidth: '80%',
      }}
    >
      <View style={[styles.message, { ...MessageStyles(message.fromMe) }]}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    </HoldItem>
  </View>
);

const MessageItem = memo(MessageItemComp);

const ChatPage = () => {
  const data = useMemo(() => mockWhatsAppData(1000), []);

  const renderMessage = useCallback(
    ({ item }) => <MessageItem message={item} />,
    []
  );

  return (
    <AnimatedFlatList
      data={data}
      keyExtractor={item => `${item.id}`}
      renderItem={renderMessage}
      contentContainerStyle={{ paddingHorizontal: StyleGuide.spacing }}
      windowSize={5}
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
});
