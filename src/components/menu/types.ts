import { ViewStyle } from "react-native";
import { TransformOriginAnchorPosition } from "../../utils/calculations";

export type MenuItemProps = {
  title: string;
  icon?: React.ReactNode | null;
  onPress: () => void;
};

export interface MenuProps {
  id: string | number;
  isActive: boolean;
  items: MenuItemProps[];
  itemHeight?: number;
  itemWidth?: number;
  anchorPosition: TransformOriginAnchorPosition;
  menuStyles?: ViewStyle;
  theme?: string;
}
