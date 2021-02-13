import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { MenuItemProps } from '../../types';
import { TransformOriginAnchorPosition } from '../../utils/calculations';

export interface HoldItemCommonProps {
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
   * Hold item wrapper component styles.
   * You may need for some examples like dynamic width or hight like message boxes.
   * See Whatsapp example.
   * @type ViewStyles
   * @default {}
   * @examples
   * styles={{ maxWidth: '80%' }}
   */
  styles?: ViewStyle | ViewStyle[];

  /**
   * Callback function that need to be set and called when menu is toggled.
   * @type () => void;
   * @examples
   * onActivate={()=>{ handleActivate(item.id) }}
   */
  onActivate: () => void;

  /**
   * Theme for menu background and texts
   * @type string
   * @examples
   * theme="light"
   */
  theme?: 'light' | 'dark';
}

export interface HoldItemProps extends HoldItemCommonProps {
  /**
   * Shared value with unique item ID that used to activate related item.
   * @type Animated.SharedValue<number>
   * @examples
   * const active = useSharedValue<number>(0);
   */
  active: Animated.SharedValue<number>;
}

export interface HoldItemChildProps extends HoldItemCommonProps {
  isActive: Animated.SharedValue<boolean>;
}
