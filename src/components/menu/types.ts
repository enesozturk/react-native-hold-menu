import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { TransformOriginAnchorPosition } from '../../utils/calculations';

export interface IMenuItem {
  title: string;
  icon?: React.ReactNode | null;
  onPress: () => void;
}

export interface IMenu {
  isActive: Animated.SharedValue<boolean>;
  items: IMenuItem[];
  itemHeight: Animated.SharedValue<number>;
  itemWidth: Animated.SharedValue<number>;
  anchorPosition: Animated.SharedValue<TransformOriginAnchorPosition>;
  menuStyles?: ViewStyle;
  theme?: 'light' | 'dark';
}
