import React, { useMemo, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import StyleGuide from '../../utilities/styleGuide';

import MessageItem from './MessageItem';
import { mockWhatsAppData } from '../../utilities/data';
import { useAppContext } from '../../hooks/useAppContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ChatPage = () => {
  const { theme } = useAppContext();
  const data = useMemo(() => mockWhatsAppData(1000), []);

  const renderMessage = useCallback(
    ({ item }) => <MessageItem message={item} />,
    []
  );

  const themeStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: StyleGuide.palette.whatsapp[theme].chatBackground,
      },
    };
  }, [theme]);

  return (
    <AnimatedFlatList
      data={data}
      keyExtractor={item => `${item.id}`}
      renderItem={renderMessage}
      style={themeStyles.container}
      contentContainerStyle={styles.contentContainer}
      windowSize={5}
      inverted
    />
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing,
  },
});
