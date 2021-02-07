import React from 'react';
import { View } from 'react-native';

import styles from './styles';

import { HoldItem } from 'react-native-hold-menu';

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

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.row}>
          <HoldItem id="1" items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem id="2" items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem id="3" items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      <View style={[styles.footer, styles.row]}>
        <HoldItem
          id="4"
          disableMove
          menuAnchorPosition="bottom-left"
          items={MenuItems}
        >
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem
          id="5"
          disableMove
          menuAnchorPosition="bottom-center"
          items={MenuItems}
        >
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem
          id="6"
          disableMove
          menuAnchorPosition="bottom-right"
          items={MenuItems}
        >
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View>
    </View>
  );
};

export default Playground;
