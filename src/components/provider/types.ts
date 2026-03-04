import type { ComponentType, ReactNode } from 'react';

export type HoldMenuIconComponentProps = {
  name: string;
  size?: number;
  style?: unknown;
  color?: string;
};

export interface HoldMenuProviderProps {
  /**
   * Theme of hold menu. Affects backdrop and context menu styles.
   * @default "light"
   */
  theme?: 'dark' | 'light';
  iconComponent?: ComponentType<HoldMenuIconComponentProps>;
  children: ReactNode;

  /**
   * Set this to prevent the menu from being opened under the unsafe area.
   * @default { top: 0, bottom: 0, right: 0, left: 0 }
   */
  safeAreaInsets?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  onOpen?: () => void;
  onClose?: () => void;
}
