import React, { memo, useMemo, useState } from 'react';
import { PortalHost } from '@gorhom/portal';
import { useSharedValue } from 'react-native-reanimated';
import { InternalContext } from '../../context/internal';
// Components
// import Backdrop from '../backdrop';

// Utils
import { StateProps, Action } from './reducer';
import { ProviderProps } from './types';
import { Backdrop } from '../backdrop';
import { CONTEXT_MENU_STATE } from '../../constants';

export interface Store {
  state: StateProps;
  dispatch?: React.Dispatch<Action>;
}
export const HoldMenuContext = React.createContext(null);

const ProviderComponent = ({ children }: ProviderProps) => {
  const state = useSharedValue<CONTEXT_MENU_STATE>(
    CONTEXT_MENU_STATE.UNDETERMINED
  );
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

  //#region context variables
  const internalContextVariables = useMemo(
    () => ({
      state,
    }),
    [state]
  );
  //#endregion

  return (
    <InternalContext.Provider value={internalContextVariables}>
      <HoldMenuContext.Provider value={value}>
        <PortalHost>
          {children}
          <Backdrop />
        </PortalHost>
      </HoldMenuContext.Provider>
    </InternalContext.Provider>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;
