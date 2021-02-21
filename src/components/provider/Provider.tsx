import React, { memo, useEffect, useMemo } from 'react';
import { PortalHost } from '@gorhom/portal';
import { useSharedValue } from 'react-native-reanimated';
import { InternalContext } from '../../context/internal';

// Components
import { Backdrop } from '../backdrop';

// Utils
import { IHoldMenuProvider } from './types';
import { StateProps, Action } from './reducer';
import { CONTEXT_MENU_STATE } from '../../constants';
export interface Store {
  state: StateProps;
  dispatch?: React.Dispatch<Action>;
}

const ProviderComponent = ({
  children,
  theme: selectedTheme,
}: IHoldMenuProvider) => {
  const state = useSharedValue<CONTEXT_MENU_STATE>(
    CONTEXT_MENU_STATE.UNDETERMINED
  );
  const theme = useSharedValue<'light' | 'dark'>(selectedTheme || 'light');

  useEffect(() => {
    theme.value = selectedTheme || 'light';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const internalContextVariables = useMemo(
    () => ({
      state,
      theme,
    }),
    [state, theme]
  );

  return (
    <InternalContext.Provider value={internalContextVariables}>
      <PortalHost>
        {children}
        <Backdrop />
      </PortalHost>
    </InternalContext.Provider>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;
