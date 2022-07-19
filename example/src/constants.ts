import { Dimensions, Platform } from 'react-native';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const IS_IOS = Platform.OS === 'ios';

const MenuItems = [
  {
    text: 'Reply',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Reply');
    },
  },
  {
    text: 'Copy',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Copy');
    },
  },
  {
    text: 'Edit',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Edit');
    },
  },
  {
    text: 'Pin',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Pin');
    },
  },
  {
    text: 'Forward',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Forward');
    },
  },
  {
    text: 'Delete',
    icon: null,
    onPress: () => {
      console.log('[ACTION]: Delete');
    },
  },
];

export { WINDOW_HEIGHT, WINDOW_WIDTH, MenuItems, IS_IOS };
