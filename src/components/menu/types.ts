import { TransformOriginAnchorPosition } from '../../utils/calculations';

export interface IMenuItem {
  title: string;
  icon?: () => React.ReactNode;
  onPress: () => void;
}

export interface IInternalMenuItem extends IMenuItem {
  id: string;
}

export interface IMenu {
  // isActive: Animated.SharedValue<boolean>;
  // items: IMenuItem[];
  // itemHeight: Animated.SharedValue<number>;
  // itemWidth: Animated.SharedValue<number>;
  // anchorPosition: Animated.SharedValue<TransformOriginAnchorPosition>;
}

export interface IMenuList {
  items: IMenuItem[];
}

export interface IMenuInternal {
  items: IInternalMenuItem[];
  itemHeight: number;
  itemWidth: number;
  itemY: number;
  itemX: number;
  anchorPosition: TransformOriginAnchorPosition;
  menuHeight: number;
  transformValue: number;
}
