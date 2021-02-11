import React, { useState } from 'react';
import { View } from 'react-native';

import styles from './styles';

import { Backdrop, HoldItem, useHoldMenu } from 'react-native-hold-menu';
// import * as Haptics from 'expo-haptics';
import { useSharedValue } from 'react-native-reanimated';

export const MenuItems = [
  {
    title: 'Reply',
    icon: null,
    onPress: () => {
      console.log('EDIT ACTION');
    },
  },
  {
    title: 'Copy',
    icon: null,
    onPress: () => {
      console.log('EDIT ACTION');
    },
  },
  {
    title: 'Edit',
    icon: null,
    onPress: () => {
      console.log('EDIT ACTION');
    },
  },
  {
    title: 'Pin',
    icon: null,
    onPress: () => {
      console.log('DELETE ACTION');
    },
  },
  {
    title: 'Forward',
    icon: null,
    onPress: () => {
      console.log('DELETE ACTION');
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
  const active = useSharedValue<number>(0);

  const handleOnActivate = (itemId: number) => {
    active.value = itemId;
  };

  const handleOnDeactivate = () => {
    active.value = 0;
  };

  return (
    <View style={styles.container}>
      <Backdrop activeItem={active} handleDeactivate={handleOnDeactivate} />
      <View style={[styles.column, { flex: 1 }]}>
        <View
          style={[
            styles.row,
            { flex: 1, alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <HoldItem
            id={1}
            items={MenuItems}
            active={active}
            onActivate={() => {
              handleOnActivate(1);
            }}
          >
            <View style={styles.item}>
              <View style={[styles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem
            id={2}
            items={MenuItems}
            active={active}
            onActivate={() => {
              handleOnActivate(2);
            }}
          >
            <View style={styles.item}>
              <View style={[styles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem
            id={3}
            items={MenuItems}
            active={active}
            onActivate={() => {
              handleOnActivate(3);
            }}
          >
            <View style={styles.item}>
              <View style={[styles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      {/* <View style={[styles.footer, styles.row]}>
        <HoldItem
          id="4"
          disableMove
          menuAnchorPosition="bottom-left"
          items={MenuItems}
          onActivate={handleOnActivate}
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
          onActivate={handleOnActivate}
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
          onActivate={handleOnActivate}
        >
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View> */}
    </View>
  );
};

export default Playground;
