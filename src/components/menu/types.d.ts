import { TransformOriginAnchorPosition } from '../../utils/calculations';

export type MenuItemProps = {
  title: string;
  icon?: () => React.ReactNode;
  onPress: () => void;
};

export type MenuListProps = {
  items: MenuItemProps[];
};

export type MenuInternalProps = {
  items: MenuItemProps[];
  itemHeight: number;
  itemWidth: number;
  itemY: number;
  itemX: number;
  anchorPosition: TransformOriginAnchorPosition;
  menuHeight: number;
  transformValue: number;
};
