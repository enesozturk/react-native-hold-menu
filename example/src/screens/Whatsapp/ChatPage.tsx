import React, { memo, useMemo, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import MessageItem from './MessageItem';
import { mockWhatsAppData } from '../../utilities/data';
import { useAppContext } from '../../hooks/useAppContext';
import { HoldMenuFlatList } from 'react-native-hold-menu';

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

  const myMenu = [
    {
      text: 'Reply1',
      icon: 'corner-down-left',
      onPresss: replyMessage,
    },
    {
      text: 'Copy1',
      icon: 'copy',
      onPress: copyMessage,
    },
    {
      text: 'Edit1',
      icon: 'home',
      onPress: editMessage,
    },
    {
      text: 'Pin1',
      icon: 'map-pin',
      onPress: () => {},
    },
    {
      text: 'Forward1',
      icon: 'corner-up-right',
      onPress: () => {},
    },
    {
      text: 'Delete1',
      icon: 'trash-2',
      onPress: () => {},
    },
  ];

  const otherMenu = [
    {
      text: 'Reply',
      icon: 'corner-down-left',
      onPress: () => {},
    },
    {
      text: 'Copy',
      icon: 'copy',
      onPress: copyMessage,
    },
    {
      text: 'Pin',
      icon: 'map-pin',
      onPress: () => {},
    },
    {
      text: 'Forward',
      icon: 'corner-up-right',
      onPress: () => {},
    },
    {
      text: 'Delete',
      icon: 'trash-2',
      onPress: () => {},
    },
  ];

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
