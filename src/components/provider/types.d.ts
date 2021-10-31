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
   * Set true if you want to disable the blured backdrop 
   * @type boolean
   * @default false
   * @examples
   * disableBackdrop={false}
   */
  disableBackdrop?: boolean;
}
