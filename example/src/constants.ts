import { Dimensions, Platform } from 'react-native';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const IS_IOS = Platform.OS === 'ios';

const MenuItems = [
  {
    title: 'Reply',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Reply');
    },
  },
  {
    title: 'Copy',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Copy');
    },
  },
  {
    title: 'Edit',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Edit');
    },
  },
  {
    title: 'Pin',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Pin');
    },
  },
  {
    title: 'Forward',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Forward');
    },
  },
  {
    title: 'Delete',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Delete');
    },
  },
];

export { WINDOW_HEIGHT, WINDOW_WIDTH, MenuItems, IS_IOS };
