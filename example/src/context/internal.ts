import { createContext } from 'react';

export interface IAppContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AppContext = createContext<IAppContext | null>(null);
