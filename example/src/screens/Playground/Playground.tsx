import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { HoldItem, useHoldMenuList } from 'react-native-hold-menu';

import styles from './styles';
import { useAppContext } from '../../hooks/useAppContext';
import StyleGuide from '../../utilities/styleGuide';
// import Icon from 'react-native-vector-icons/Feather';

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  const { theme } = useAppContext();

  // [Message]: Here, MenuItem does not render icon
  const items = useHoldMenuList([
    {
      title: 'Reply 1',
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
      onPress: () => {
        console.log('[ACTION]: Edit');
      },
    },
  ]);

  const themeStyles = useMemo(() => {
    return {
      containerStyles: [
        styles.container,
        { backgroundColor: StyleGuide.palette[theme].backgroundColor },
      ],
      item: [
        styles.item,
        { backgroundColor: StyleGuide.palette[theme].primary },
      ],
      dot: [
        styles.dot,
        { backgroundColor: StyleGuide.palette[theme].primaryDark },
      ],
      footer: [
        styles.footer,
        { borderColor: StyleGuide.palette[theme].secondary },
      ],
    };
  }, [theme]);

  return (
    <View style={themeStyles.containerStyles}>
      <View style={[styles.column, styles.content]}>
        <View style={[styles.row]}>
          <HoldItem items={items} menuAnchorPosition="bottom-left">
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.bottomLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
        <View style={[styles.row]}>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      <View style={[themeStyles.footer, styles.row]}>
        <HoldItem menuAnchorPosition="bottom-left" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-center" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-right" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View>
    </View>
  );
};

export default memo(Playground);
