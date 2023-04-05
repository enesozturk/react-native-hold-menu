import React, { memo, useEffect, useMemo } from 'react';
import { PortalProvider } from '@gorhom/portal';
import Animated, { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Components
import { Backdrop } from '../backdrop';

// Utils
import { InternalContext } from '../../context/internal';
import { HoldMenuProviderProps } from './types';
import { StateProps, Action } from './reducer';
import { CONTEXT_MENU_STATE } from '../../constants';
import { MenuInternalProps } from '../menu/types';
import Menu from '../menu';

export interface Store {
  state: StateProps;
  dispatch?: React.Dispatch<Action>;
}

export let AnimatedIcon: any;

const ProviderComponent = ({
  children,
  theme: selectedTheme,
  iconComponent,
  safeAreaInsets,
  onOpen,
  onClose,
}: HoldMenuProviderProps) => {
  if (iconComponent)
    AnimatedIcon = Animated.createAnimatedComponent(iconComponent);

  const state = useSharedValue<CONTEXT_MENU_STATE>(
    CONTEXT_MENU_STATE.UNDETERMINED
  );
  const theme = useSharedValue<'light' | 'dark'>(selectedTheme || 'light');
  const menuProps = useSharedValue<MenuInternalProps>({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    items: [],
    anchorPosition: 'top-center',
    menuHeight: 0,
    transformValue: 0,
    actionParams: {},
  });

  useEffect(() => {
    theme.value = selectedTheme || 'light';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  useAnimatedReaction(
    () => state.value,
    state => {
      switch (state) {
        case CONTEXT_MENU_STATE.ACTIVE: {
          if (onOpen)
            runOnJS(onOpen)();
          break
        }
        case CONTEXT_MENU_STATE.END: {
          if (onClose)
            runOnJS(onClose)();
          break
        }
      }
    },
    [state]
  );

  const internalContextVariables = useMemo(
    () => ({
      state,
      theme,
      menuProps,
      safeAreaInsets: safeAreaInsets || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    }),
    [state, theme, menuProps, safeAreaInsets]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InternalContext.Provider value={internalContextVariables}>
        <PortalProvider>
          {children}
          <Backdrop />
          <Menu />
        </PortalProvider>
      </InternalContext.Provider>
    </GestureHandlerRootView>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;
