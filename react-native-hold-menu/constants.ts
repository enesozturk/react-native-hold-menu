import { Dimensions } from 'react-native';

enum CONTEXT_MENU_STATE {
  UNDETERMINED = 0,
  ACTIVE,
  END
};

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

export {
  CONTEXT_MENU_STATE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH
}