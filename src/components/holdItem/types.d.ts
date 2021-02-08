import { ViewStyle } from 'react-native';
import { MenuItemProps } from '../../types';
import { TransformOriginAnchorPosition } from '../../utils/calculations';

export interface HoldItemProps {
  /**
   * Identifier for hold items. Must be unique.
   * @type string | number
   */
  id: string | number;

  /**
   * List of context menu items.
   * @type MenuItemProps[]
   * @default []
   */
  items: MenuItemProps[];

  children: React.ReactElement | React.ReactElement[];

  /**
   * Menu anchor position is calculated automaticly.
   * But you can override the calculation by passing an anchor position.
   * @type TransformOriginAnchorPosition
   * @examples
   * menuAnchorPosition="top-bottom"
   */
  menuAnchorPosition?: TransformOriginAnchorPosition;

  /**
   * Disables moving holded item
   * @type boolean
   * @default false
   * @examples
   * disableMove={true}
   */
  disableMove?: boolean;

  /**
   *
   * @type boolean
   * @default false
   * @examples
   * disableMove={true}
   */
  styles?: ViewStyle | ViewStyle[];

  onActivate?: () => void;
}

export interface HoldItemChildProps extends HoldItemProps {
  theme?: 'light' | 'dark';
  isActive: boolean;
  handleActivate: () => void;
}
