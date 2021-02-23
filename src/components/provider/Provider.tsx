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
import { IMenuInternal } from '../menu/types';
import Menu from '../menu';
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
  const menuProps = useSharedValue<IMenuInternal>({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    items: [],
    anchorPosition: 'top-center',
    menuHeight: 0,
    transformValue: 0,
  });

  useEffect(() => {
    theme.value = selectedTheme || 'light';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const internalContextVariables = useMemo(
    () => ({
      state,
      theme,
      menuProps,
    }),
    [state, theme, menuProps]
  );

  return (
    <InternalContext.Provider value={internalContextVariables}>
      <PortalHost>
        {children}
        <Backdrop />
        <Menu />
      </PortalHost>
    </InternalContext.Provider>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;
