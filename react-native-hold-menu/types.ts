import { ViewStyle } from "react-native";
import { TransformOriginAnchorPoint } from "./utils/Calculations";

export interface MenuProps {
  toggle?: boolean;
  itemHeight?: number;
  anchorPoint?: TransformOriginAnchorPoint;
  containerStyles?: ViewStyle;
  menuStyles?: ViewStyle;
}
