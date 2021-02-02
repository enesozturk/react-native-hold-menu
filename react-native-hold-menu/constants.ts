import { Dimensions } from "react-native";

export const HOLD_ITEM_TRANSFORM_DURATION = 200;

enum CONTEXT_MENU_STATE {
  UNDETERMINED = 0,
  ACTIVE,
  END,
}

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("screen");

export const MENU_CONTAINER_WIDTH = 100;
export const MENU_WIDTH = (WINDOW_WIDTH * 60) / 100;

export { CONTEXT_MENU_STATE, WINDOW_HEIGHT, WINDOW_WIDTH };
