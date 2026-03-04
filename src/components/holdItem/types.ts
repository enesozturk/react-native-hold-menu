import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { MenuItemProps } from '../menu/types';
import type { TransformOriginAnchorPosition } from '../../utils/calculations';

export type HoldItemProps = {
  /**
   * List of context menu items.
   * @type MenuItemProps[]
   * @default []
   */
  items: MenuItemProps[];

  /**
   * Object of keys that same name with items to match parameters to onPress actions.
   */
  actionParams?: Record<string, unknown[]>;

  children: ReactNode;

  /**
   * Menu anchor position is calculated automatically.
   */
  menuAnchorPosition?: TransformOriginAnchorPosition;

  /**
   * Disables moving held item.
   */
  disableMove?: boolean;

  /**
   * HoldItem wrapper component styles.
   */
  containerStyles?: StyleProp<ViewStyle>;

  /**
   * Set true if you want to open menu from bottom.
   */
  bottom?: boolean;

  /**
   * Set if you'd like a different tap activation.
   */
  activateOn?: 'tap' | 'double-tap' | 'hold';

  /**
   * Set if you'd like to enable haptic feedback on activation.
   */
  hapticFeedback?:
    | 'None'
    | 'Selection'
    | 'Light'
    | 'Medium'
    | 'Heavy'
    | 'Success'
    | 'Warning'
    | 'Error';

  /**
   * Set true if you want to close menu when tapping the held item.
   */
  closeOnTap?: boolean;

  /**
   * Set delay before long tap will activate gesture.
   */
  longPressMinDurationMs?: number;
};
