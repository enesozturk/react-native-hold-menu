import type Animated from "react-native-reanimated";
import type { CONTEXT_MENU_STATE } from "../../constants";
import { MenuItemProps } from "../../types";

export interface HoldItemProps {
  id: string | number;
  items: MenuItemProps[];
  // item: T;
  // contextMenuState: Animated.SharedValue<CONTEXT_MENU_STATE>;
  // selectedItemIndex: Animated.SharedValue<number>;
  children: React.ReactElement | React.ReactElement[];
}
