import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

import { MessageStyles } from './variables';
import { useAppContext } from '../../hooks/useAppContext';
import { MenuItems } from '../../constants';

// React Native Hold Menu Components
import { HoldItem } from 'react-native-hold-menu';

const MessageItemComp = ({ message }: { message: any }) => {
  const { theme } = useAppContext();

  const themeStyles = useMemo(() => {
    return {
      messageContainer: [styles.messageContainer],
      message: [styles.message],
      messageText: [
        styles.messageText,
        { color: StyleGuide.palette.whatsapp[theme].messageText },
      ],
    };
  }, [theme]);

  return (
    <View
      style={[
        themeStyles.messageContainer,
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
        <View
          style={[
            themeStyles.message,
            { ...MessageStyles(message.fromMe, theme) },
          ]}
        >
          <Text style={themeStyles.messageText}>{message.text}</Text>
        </View>
      </HoldItem>
    </View>
  );
};

const MessageItem = memo(MessageItemComp);

export default MessageItem;

const styles = StyleSheet.create({
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
    textAlign: 'left',
  },
});
