import React, { memo } from 'react'
import { ItemToHold } from '../../react-native-hold-menu';

const ChatItemComponent = () => {

  return (
    <ItemToHold
        containerProps={{
          scrollY: scrollY,
          height: containerHeight,
        }}
        key={index}
        onOpenMenu={() => handleOpenMenu(message.id)}
        onCloseMenu={handleCloseMenu}
        isSelected={selectedMessage == message.id}
        menuProps={{
          items: [
            { id: 1, title: "Add", icon: "help-circle" },
            { id: 1, title: "Add 1", icon: "help-circle" },
            { id: 1, title: "Add 2", icon: "help-circle" },
          ],
          anchorPoint: message.fromMe ? "top-right" : "top-left",
        }}
        containerStyle={{
          ...styles.messageContainer,
          ...{ alignItems: message.fromMe ? "flex-end" : "flex-start" },
        }}
        wrapperStyle={{
          ...styles.message,
          ...MessageStyles(message.fromMe),
        }}
      >
        <Text style={styles.messageText}>{message.text}</Text>
        <View style={styles.messageTimeAndSeenContainer}>
          <Text style={styles.messageTimeText}>{message.time}</Text>
          <MaterialIcons
            name="done-all"
            size={16}
            color={StyleGuide.palette.whatsapp.seenCheckColor}
          />
        </View>
      </ItemToHold>
  )
}

const ChatItem = memo(ChatItemComponent);

export default ChatItem;
