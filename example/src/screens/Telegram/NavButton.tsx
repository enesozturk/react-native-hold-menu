import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Feather as Icons } from '@expo/vector-icons';
import StyleGuide from '../../utilities/styleGuide';
import { HoldItem } from 'react-native-hold-menu';
import { useAppContext } from '../../hooks/useAppContext';

interface INavButton extends BottomTabBarProps {
  icon: string;
  title: string;
  id: number;
  active: Animated.SharedValue<number>;
  menuItems: any;
  onActive: (arg: number) => void;
}

function NavButton({ icon, title, menuItems }: INavButton) {
  const { theme } = useAppContext();

  const themeStyles = useMemo(() => {
    return {
      button: [
        styles.button,
        { backgroundColor: StyleGuide.palette[theme].secondary },
      ],
      text: [styles.text, { color: StyleGuide.palette[theme].color }],
      color: StyleGuide.palette[theme].color,
    };
  }, [theme]);

  return (
    <>
      <Pressable style={themeStyles.button}>
        <View style={styles.wrapper}>
          <HoldItem bottom items={menuItems} containerStyles={styles.holdItem}>
            <View style={styles.content}>
              <Icons size={18} name={icon} color={themeStyles.color} />
              <Text style={themeStyles.text}>{title}</Text>
            </View>
          </HoldItem>
        </View>
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
  holdItem: { width: '100%' },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: StyleGuide.spacing,
    fontSize: 12,
  },
});
