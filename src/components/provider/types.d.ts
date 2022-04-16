export interface HoldMenuProviderProps {
  /**
   * Theme of hold menu. Effects to backdrop and context menu styles. Optional.
   * @type "light" | "dark"
   * @default "light"
   * @examples
   * theme="light"
   */
  theme?: 'dark' | 'light';
  iconComponent?: any;
  children: React.ReactElement | React.ReactElement[];

  /**
   * Set if you'd like to apply padding to bottom (safe area bottom inset in most case)
   * @type number
   * @default 0
   * @examples
   * paddingBottom={34}
   */
  paddingBottom?: number;
}
