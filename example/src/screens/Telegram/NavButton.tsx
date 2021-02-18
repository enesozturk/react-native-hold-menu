import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/Feather';
import StyleGuide from '../../utilities/styleGuide';
import { HoldItem } from 'react-native-hold-menu';

interface INavButton extends BottomTabBarProps {
  icon: string;
  title: string;
  id: number;
  active: Animated.SharedValue<number>;
  menuItems: any;
  onActive: (arg: number) => void;
}

function NavButton({ icon, title, menuItems, activeTintColor }: INavButton) {
  return (
    <>
      <Pressable style={styles.button}>
        <HoldItem bottom items={menuItems}>
          <View style={styles.content}>
            <Icons size={18} name={icon} color={activeTintColor} />
            <Text style={styles.text}>{title}</Text>
          </View>
        </HoldItem>
      </Pressable>
    </>
  );
}

export default NavButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: StyleGuide.spacing,
    fontSize: 12,
  },
});
