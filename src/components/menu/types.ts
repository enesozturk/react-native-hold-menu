import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { TransformOriginAnchorPosition } from '../../utils/calculations';

export type MenuItemProps = {
  title: string;
  icon?: React.ReactNode | null;
  onPress: () => void;
};

export interface MenuProps {
  id: string | number;
  isActive: Animated.SharedValue<boolean>;
  items: MenuItemProps[];
  itemHeight: Animated.SharedValue<number>;
  itemWidth: Animated.SharedValue<number>;
  anchorPosition: Animated.SharedValue<TransformOriginAnchorPosition>;
  menuStyles?: ViewStyle;
  theme?: 'light' | 'dark';
}
