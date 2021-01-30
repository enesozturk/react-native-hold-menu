import { Dimensions } from "react-native";

export const HOLD_ITEM_TRANSFORM_DURATION = 150;

enum CONTEXT_MENU_STATE {
  UNDETERMINED = 0,
  ACTIVE,
  END,
}

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");

export { CONTEXT_MENU_STATE, WINDOW_HEIGHT, WINDOW_WIDTH };
