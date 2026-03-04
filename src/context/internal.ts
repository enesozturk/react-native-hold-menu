import { createContext, type ComponentType, type ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { MenuInternalProps, MenuItemProps } from '../components/menu/types';
import type { HoldMenuIconComponentProps } from '../components/provider/types';
import type { CONTEXT_MENU_STATE } from '../constants';

export type ActiveOverlay = {
    id: string;
    itemNode: ReactNode;
    itemScale: SharedValue<number>;
    isActive: SharedValue<boolean>;
    itemRectY: SharedValue<number>;
    itemRectX: SharedValue<number>;
    itemRectWidth: SharedValue<number>;
    itemRectHeight: SharedValue<number>;
    disableMove?: boolean;
    closeOnTap?: boolean;
};

export type InternalContextType = {
    state: SharedValue<CONTEXT_MENU_STATE>;
    activeItemId: SharedValue<string | null>;
    theme: SharedValue<'light' | 'dark'>;
    menuProps: SharedValue<MenuInternalProps>;
    menuItems: MenuItemProps[];
    menuActionParams: Record<string, unknown[]>;
    setMenuData: (
        items: MenuItemProps[],
        actionParams: Record<string, unknown[]>
    ) => void;
    activeOverlayId: string | null;
    setActiveOverlay: (overlay: ActiveOverlay) => void;
    clearActiveOverlay: (overlayId?: string) => void;
    safeAreaInsets?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /** Optional animated icon component for menu items. Set by HoldMenuProvider from iconComponent prop. */
    animatedIcon: ComponentType<HoldMenuIconComponentProps> | null;
};

export const InternalContext = createContext<InternalContextType | null>(null);
