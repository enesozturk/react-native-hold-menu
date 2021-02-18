import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Backdrop, HoldItem } from 'react-native-hold-menu';

import styles from './styles';
import { MenuItems } from '../../constants';

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
      {/* <Backdrop activeItem={active} handleDeactivate={handleOnDeactivate} /> */}
      <View
        style={[styles.column, { flex: 1, justifyContent: 'space-between' }]}
      >
        <View style={[styles.row]}>
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
        <View style={[styles.row]}>
          <HoldItem
            id={4}
            items={MenuItems}
            active={active}
            onActivate={() => {
              handleOnActivate(4);
            }}
          >
            <View style={styles.item}>
              <View style={[styles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem
            id={5}
            items={MenuItems}
            active={active}
            onActivate={() => {
              handleOnActivate(5);
            }}
          >
            <View style={styles.item}>
              <View style={[styles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem
            id={6}
            items={MenuItems}
            active={active}
            onActivate={() => {
              handleOnActivate(6);
            }}
          >
            <View style={styles.item}>
              <View style={[styles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      <View style={[styles.footer, styles.row]}>
        <HoldItem
          id={7}
          disableMove
          menuAnchorPosition="bottom-left"
          items={MenuItems}
          active={active}
          onActivate={() => {
            handleOnActivate(7);
          }}
        >
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem
          id={8}
          disableMove
          menuAnchorPosition="bottom-center"
          items={MenuItems}
          active={active}
          onActivate={() => {
            handleOnActivate(8);
          }}
        >
          <View style={styles.item}>
            <View style={[styles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem
          id={9}
          disableMove
          menuAnchorPosition="bottom-right"
          items={MenuItems}
          active={active}
          onActivate={() => {
            handleOnActivate(9);
          }}
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
