import React, { memo, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import MessageItem from './MessageItem';
import { mockWhatsAppData } from '../../utilities/data';
import { useAppContext } from '../../hooks/useAppContext';
import { HoldMenuFlatList } from 'react-native-hold-menu';

import Icon from 'react-native-vector-icons/Feather';

const ChatPage = () => {
  const { theme } = useAppContext();
  const data = useMemo(() => mockWhatsAppData(1000), []);

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
        onPress: () => {
          console.log('[ACTION]: Reply');
        },
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
        onPress: () => {
          console.log('[ACTION]: Copy');
        },
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
        onPress: () => {},
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
    [theme]
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
        onPress: () => {
          console.log('[ACTION]: Reply');
        },
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
        onPress: () => {
          console.log('[ACTION]: Copy');
        },
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
    [theme]
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
