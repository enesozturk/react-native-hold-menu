import type { ReactNode } from "react";
import type { LayoutRectangle } from "react-native";
import type { State } from "react-native-gesture-handler";
import type Animated from "react-native-reanimated";
import type { CONTEXT_MENU_STATE } from "../../constants";

export interface ListItemPopupProps {
  itemRectY: Animated.SharedValue<number>;
  itemRectX: Animated.SharedValue<number>;
  itemRectHeight: Animated.SharedValue<number>;
  itemRectWidth: Animated.SharedValue<number>;
  contextMenuState: Animated.SharedValue<CONTEXT_MENU_STATE>;
  longPressGestureState: Animated.SharedValue<State>;
  renderContent: () => ReactNode;
}
