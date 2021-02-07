import { ViewStyle } from "react-native";
import type Animated from "react-native-reanimated";
import type { CONTEXT_MENU_STATE } from "../../constants";
import { MenuItemProps } from "../../types";
import { TransformOriginAnchorPosition } from "../../utils/calculations";

export interface ProviderProps {
  /**
   * Theme of hold menu. Effects to backdrop and context menu styles. Optional.
   * @type "light" | "dark"
   * @default "light"
   * @examples
   * theme="light"
   */
  theme?: "dark" | "light";
  children: React.ReactElement | React.ReactElement[];
}
