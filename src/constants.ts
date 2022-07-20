import { Dimensions, Platform } from 'react-native';

export const HOLD_ITEM_TRANSFORM_DURATION = 150;
export const HOLD_ITEM_SCALE_DOWN_VALUE = 0.95;
export const HOLD_ITEM_SCALE_DOWN_DURATION = 210;

export const SPRING_CONFIGURATION = {
  damping: 33,
  mass: 1.03,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export const SPRING_CONFIGURATION_MENU = {
  damping: 39,
  mass: 1.09,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export enum CONTEXT_MENU_STATE {
  UNDETERMINED = 0,
  ACTIVE,
  END,
}

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('screen');
export { WINDOW_HEIGHT, WINDOW_WIDTH };

export const MENU_CONTAINER_WIDTH = 100;
export const MENU_WIDTH = (WINDOW_WIDTH * 60) / 100;

export const MENU_TRANSFORM_ORIGIN_TOLERENCE = 10;

export const IS_IOS = Platform.OS === 'ios';

export const FONT_SCALE = Dimensions.get('screen').fontScale;

export const PREVIEW_CONTAINER_HEIGHT = WINDOW_HEIGHT / 3;
export const PREVIEW_CONTAINER_WIDTH = WINDOW_WIDTH - 64;
