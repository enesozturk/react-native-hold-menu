import { createContext } from "react";
import type { MenuBackDropMethods } from "../types";

// @ts-ignore
export const HoldMenuContext = createContext<MenuBackDropMethods>();

export const BottomSheetProvider = HoldMenuContext.Provider;
