import React, { useMemo } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import { MessageStyles } from './variables';
import { mockWhatsAppData } from '../../utilities/data';

// React Native Hold Menu Components
import { HoldItem, Backdrop } from 'react-native-hold-menu';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { memo } from 'react';
import { useCallback } from 'react';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

const MessageItemComp = ({
  active,
  message,
  handleActivate,
}: {
  active: Animated.SharedValue<number>;
  handleActivate: (arg: number) => void;
  message: any;
}) => (
  <View
    style={[
      styles.messageContainer,
      { alignItems: message.fromMe ? 'flex-end' : 'flex-start' },
    ]}
  >
    <HoldItem
      id={message.id}
      items={MenuItems}
      active={active}
      onActivate={() => {
        handleActivate(message.id);
      }}
      styles={{
        position: 'relative',
        maxWidth: '70%',
      }}
    >
      <View style={[styles.message, { ...MessageStyles(message.fromMe) }]}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    </HoldItem>
  </View>
);

const MessageItem = memo(MessageItemComp, (prevProps, nextProps) => {
  if (prevProps.active == nextProps.active) return true;
  else return false;
});

const ChatPage = () => {
  const active = useSharedValue<number>(0);

  const handleOnActivate = (itemId: number) => {
    active.value = itemId;
  };

  const handleOnDeactivate = () => {
    active.value = 0;
  };

  const data = useMemo(() => mockWhatsAppData(100), []);

  const renderMessage = useCallback(
    ({ item }) => (
      <MessageItem
        active={active}
        handleActivate={handleOnActivate}
        message={item}
      />
    ),
    []
  );

  return (
    <>
      <AnimatedFlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingHorizontal: StyleGuide.spacing }}
        windowSize={5}
        inverted
      />
      <Backdrop activeItem={active} handleDeactivate={handleOnDeactivate} />
    </>
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
