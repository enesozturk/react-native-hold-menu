import React, { memo, useState } from 'react';
import { PortalHost } from '@gorhom/portal';

// Components
// import Backdrop from '../backdrop';

// Utils
import {
  reducer,
  initialState,
  StateProps,
  Action,
  ActionType,
} from './reducer';
import { ProviderProps } from './types';
import { useSharedValue } from 'react-native-reanimated';

export interface Store {
  state: StateProps;
  dispatch?: React.Dispatch<Action>;
}
export const HoldMenuContext = React.createContext();

const ProviderComponent = ({ children }: ProviderProps) => {
  const [menuState, setMenuState] = useState({
    isActive: false,
    theme: 'light',
    activeItemId: '',
  });

  const value = {
    menuState,
    activate: (itemId: string) => {
      setMenuState({ ...menuState, isActive: true, activeItemId: itemId });
    },
    deactivate: () => {
      setMenuState({ ...menuState, isActive: true, activeItemId: '' });
    },
    toggleTheme: () => {
      setMenuState({
        ...menuState,
        theme: menuState.theme == 'light' ? 'dark' : 'light',
      });
    },
  };

  return (
    <HoldMenuContext.Provider value={value}>
      <PortalHost>{children}</PortalHost>
    </HoldMenuContext.Provider>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;
