import React, { memo, useMemo, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import MessageItem from './MessageItem';
import { mockWhatsAppData } from '../../utilities/data';
import { useAppContext } from '../../hooks/useAppContext';
import { HoldMenuFlatList } from 'react-native-hold-menu';

import Icon from 'react-native-vector-icons/Feather';

const ChatPage = () => {
  const { theme } = useAppContext();
  const data = useMemo(() => mockWhatsAppData(1000), []);

  const replyMessage = useCallback((messageId: string) => {
    Alert.alert(`[ACTION]: REPLY' ${messageId}`);
  }, []);

  const copyMessage = useCallback((messageText: string) => {
    Alert.alert(`[ACTION]: REPLY' ${messageText}`);
  }, []);

  const editMessage = useCallback((messageId: string, messageText: string) => {
    Alert.alert(`[ACTION]: REPLY' ${messageId} - ${messageText}`);
  }, []);

  const myMenu = useMemo(
    () => [
      {
        text: 'Reply',
        icon: () => (
          <Icon
            name="corner-down-left"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: replyMessage,
      },
      {
        text: 'Copy',
        icon: () => (
          <Icon
            name="copy"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: copyMessage,
      },
      {
        text: 'Edit',
        icon: () => (
          <Icon
            name="edit"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: editMessage,
      },
      {
        text: 'Pin',
        icon: () => (
          <Icon
            name="map-pin"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {},
      },
      {
        text: 'Forward',
        icon: () => (
          <Icon
            name="corner-up-right"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {},
      },
      {
        text: 'Delete',
        icon: () => (
          <Icon
            name="trash-2"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {},
      },
    ],
    [theme, replyMessage, copyMessage, editMessage]
  );

  const otherMenu = useMemo(
    () => [
      {
        text: 'Reply',
        icon: () => (
          <Icon
            name="corner-down-left"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: replyMessage,
      },
      {
        text: 'Copy',
        icon: () => (
          <Icon
            name="copy"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: copyMessage,
      },
      {
        text: 'Pin',
        icon: () => (
          <Icon
            name="map-pin"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {},
      },
      {
        text: 'Forward',
        icon: () => (
          <Icon
            name="corner-up-right"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {},
      },
      {
        text: 'Delete',
        icon: () => (
          <Icon
            name="trash-2"
            size={18}
            color={theme === 'light' ? 'black' : 'white'}
          />
        ),
        onPress: () => {},
      },
    ],
    [theme, replyMessage, copyMessage]
  );

  const renderMessage = useCallback(
    ({ item }) => (
      <MessageItem
        senderMenu={myMenu}
        receiverMenu={otherMenu}
        message={item}
      />
    ),
    [myMenu, otherMenu]
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const themeStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: StyleGuide.palette.whatsapp[theme].chatBackground,
      },
    };
  }, [theme]);

  return (
    <HoldMenuFlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderMessage}
      style={themeStyles.container}
      contentContainerStyle={styles.contentContainer}
      windowSize={5}
      maxToRenderPerBatch={4}
      inverted
    />
  );
};

export default memo(ChatPage);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing,
  },
});
