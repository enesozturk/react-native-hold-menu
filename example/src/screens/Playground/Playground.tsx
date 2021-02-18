import React from 'react';
import { View } from 'react-native';

import { HoldItem } from 'react-native-hold-menu';

import styles from './styles';
import { MenuItems } from '../../constants';

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.column, { flex: 1, justifyContent: 'space-between' }]}
      >
        <View style={[styles.row]}>
          <HoldItem items={MenuItems} menuAnchorPosition="bottom-left">
            <View style={styles.item}>
              <View style={[styles.dot, styles.bottomLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
        <View style={[styles.row]}>
          <HoldItem items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={MenuItems}>
            <View style={styles.item}>
              <View style={[styles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      <View style={[styles.footer, styles.row]}>
        <HoldItem menuAnchorPosition="bottom-left" items={MenuItems}>
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-center" items={MenuItems}>
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-right" items={MenuItems}>
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View>
    </View>
  );
};

export default Playground;
