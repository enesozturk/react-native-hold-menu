import { ViewStyle } from 'react-native';
import { MenuItemProps } from '../../types';
import { TransformOriginAnchorPosition } from '../../utils/calculations';

export interface IHoldItem {
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
   * Hold item wrapper component styles.
   * You may need for some examples like dynamic width or hight like message boxes.
   * See Whatsapp example.
   * @type ViewStyles
   * @default {}
   * @examples
   * containerStyles={{ maxWidth: '80%' }}
   */
  containerStyles?: ViewStyle | ViewStyle[];

  /**
   * Theme for menu background and texts
   * @type string
   * @examples
   * theme="light"
   */
  theme?: 'light' | 'dark';

  /**
   * Set true if you want to open menu from bottom
   * @type boolean
   * @default false
   * @examples
   * bottom={true}
   */
  bottom?: boolean;
}
