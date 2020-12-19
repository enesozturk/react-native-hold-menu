import type Animated from "react-native-reanimated";
import type { CONTEXT_MENU_STATE } from "../../constants";

export interface BackdropProps {
  contextMenuState: Animated.SharedValue<CONTEXT_MENU_STATE>
}