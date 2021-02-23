import React, { memo, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import MessageItem from './MessageItem';
import { mockWhatsAppData } from '../../utilities/data';
import { useAppContext } from '../../hooks/useAppContext';
import { HoldMenuFlatList } from 'react-native-hold-menu';

import { useHoldMenuList } from 'react-native-hold-menu';

const ChatPage = () => {
  const { theme } = useAppContext();
  const data = useMemo(() => mockWhatsAppData(1000), []);

  const myMenu = useHoldMenuList([
    {
      title: 'Reply',
      onPress: () => {
        console.log('[ACTION]: Reply');
      },
    },
    {
      title: 'Copy',
      onPress: () => {
        console.log('[ACTION]: Copy');
      },
    },
    {
      title: 'Edit',
      onPress: () => {},
    },
  ]);
  const otherMenu = useHoldMenuList([
    {
      title: 'Pin',
      onPress: () => {
        console.log('[ACTION]: Pin');
      },
    },
    {
      title: 'Forward',
      onPress: () => {
        console.log('[ACTION]: Forward');
      },
    },
    {
      title: 'Delete',
      onPress: () => {
        console.log('[ACTION]: Delete');
      },
    },
  ]);

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
