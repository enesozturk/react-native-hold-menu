/// <reference types="react" />
import type Animated from 'react-native-reanimated';
import type { CONTEXT_MENU_STATE } from '../constants';
import { MenuInternalProps } from '../components/menu/types';
export declare type InternalContextType = {
    state: Animated.SharedValue<CONTEXT_MENU_STATE>;
    theme: Animated.SharedValue<'light' | 'dark'>;
    menuProps: Animated.SharedValue<MenuInternalProps>;
};
export declare const InternalContext: import("react").Context<InternalContextType>;
