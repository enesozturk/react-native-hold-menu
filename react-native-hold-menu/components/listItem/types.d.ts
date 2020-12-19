import type { FlatListProps } from "react-native";
import type Animated from "react-native-reanimated";
import type { CONTEXT_MENU_STATE } from "../../constants";

export interface ListItemProps extends Pick<FlatListProps, "renderItem"> {
  index: number;
  item: T;
  contextMenuState: Animated.SharedValue<CONTEXT_MENU_STATE>;
  selectedItemIndex: Animated.SharedValue<number>;
}
