import React, { memo } from 'react';
import { PortalHost } from '@gorhom/portal';

// Components
import Backdrop from '../backdrop';

// Utils
import {
  reducer,
  initialState,
  StateProps,
  Action,
  ActionType,
} from './reducer';
import { ProviderProps } from './types';

export interface Store {
  state: StateProps;
  dispatch?: React.Dispatch<Action>;
}
export const HoldMenuContext = React.createContext<Store>({
  state: initialState,
});

const ProviderComponent = ({ children, theme }: ProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (theme !== state.theme) dispatch({ type: ActionType.Theme });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <HoldMenuContext.Provider value={{ state, dispatch }}>
      <PortalHost>
        {children}
        <Backdrop />
      </PortalHost>
    </HoldMenuContext.Provider>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;
