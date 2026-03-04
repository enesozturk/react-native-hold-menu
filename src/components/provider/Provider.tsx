import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import Animated, {
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// Components
import { Backdrop } from '../backdrop';

// Utils
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  SPRING_CONFIGURATION,
  WINDOW_WIDTH,
} from '../../constants';
import {
    ActiveOverlay,
    InternalContext,
} from '../../context/internal';
import Menu from '../menu';
import type { MenuInternalProps, MenuItemProps } from '../menu/types';
import type {
    HoldMenuIconComponentProps,
    HoldMenuProviderProps,
} from './types';



const ProviderComponent = ({
  children,
  theme: selectedTheme,
  iconComponent,
  safeAreaInsets,
  onOpen,
  onClose,
}: HoldMenuProviderProps) => {
  const state = useSharedValue<CONTEXT_MENU_STATE>(
    CONTEXT_MENU_STATE.UNDETERMINED
  );
  const activeItemId = useSharedValue<string | null>(null);
  const theme = useSharedValue<'light' | 'dark'>(selectedTheme || 'light');
  const menuProps = useSharedValue<MenuInternalProps>({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    anchorPosition: 'top-center',
    menuHeight: 0,
    transformValue: 0,
    itemCount: 0,
    separatorCount: 0,
  });
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [menuActionParams, setMenuActionParams] = useState<
    Record<string, unknown[]>
  >({});
  const [activeOverlay, setActiveOverlayState] = useState<ActiveOverlay | null>(
    null
  );


  useEffect(() => {
    theme.value = selectedTheme || 'light';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const setActiveOverlay = useCallback((overlay: ActiveOverlay) => {
    setActiveOverlayState(overlay);
  }, []);

  const clearActiveOverlay = useCallback((overlayId?: string) => {
    setActiveOverlayState(current => {
      if (!current) {
        return current;
      }

      if (overlayId && current.id !== overlayId) {
        return current;
      }

      return null;
    });
  }, []);

  const clearOverlayAndMenu = useCallback(() => {
    setActiveOverlayState(null);
    setMenuItems([]);
    setMenuActionParams({});
  }, []);

  const setMenuData = useCallback(
    (items: MenuItemProps[], actionParams: Record<string, unknown[]>) => {
      setMenuItems(items);
      setMenuActionParams(actionParams);
    },
    []
  );

  useAnimatedReaction(
    () => state.value,
    (currentState, previousState) => {
      switch (currentState) {
        case CONTEXT_MENU_STATE.ACTIVE: {
          if (onOpen) {
            scheduleOnRN(onOpen);
          }
          break;
        }
        case CONTEXT_MENU_STATE.END: {
          if (previousState === CONTEXT_MENU_STATE.ACTIVE) {
            activeItemId.value = null;
          }
          scheduleOnRN(clearOverlayAndMenu);
          if (onClose) {
            scheduleOnRN(onClose);
          }
          break;
        }
        default: {
          break;
        }
      }
    },
    [
      activeItemId,
      onClose,
      onOpen,
      clearOverlayAndMenu,
      state,
    ]
  );



  const animatedIcon = useMemo(
    () =>
      iconComponent
        ? (Animated.createAnimatedComponent(iconComponent) as React.ComponentType<HoldMenuIconComponentProps>)
        : null,
    [iconComponent]
  );

  const internalContextVariables = useMemo(
    () => ({
      state,
      activeItemId,
      theme,
      menuProps,
      menuItems,
      menuActionParams,
      setMenuData,
      activeOverlayId: activeOverlay?.id || null,
      setActiveOverlay,
      clearActiveOverlay,
      safeAreaInsets: safeAreaInsets || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      animatedIcon,
    }),
    [
      activeItemId,
      activeOverlay?.id,
      animatedIcon,
      clearActiveOverlay,
      menuActionParams,
      menuItems,
      menuProps,
      safeAreaInsets,
      setMenuData,
      setActiveOverlay,
      state,
      theme,
    ]
  );

  const closeMenuFromRN = useCallback(() => {
    if (state.value === CONTEXT_MENU_STATE.ACTIVE) {
      state.value = CONTEXT_MENU_STATE.END;
    }
  }, [state]);

  const closeOverlayItemFromRN = useCallback(() => {
    if ((activeOverlay?.closeOnTap ?? true) && state.value === CONTEXT_MENU_STATE.ACTIVE) {
      state.value = CONTEXT_MENU_STATE.END;
    }
  }, [activeOverlay?.closeOnTap, state]);

  const animatedOverlayStyle = useAnimatedStyle(() => {
    if (!activeOverlay) {
      return {
        zIndex: 9999,
        position: 'absolute',
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        height: 0,
        opacity: 0,
        transform: [{ translateY: 0 }],
      };
    }

    const {
      isActive,
      itemRectY,
      disableMove,
    } = activeOverlay;

    return {
      zIndex: 9999,
      position: 'absolute',
      top: itemRectY.value,
      left: 0,
      width: WINDOW_WIDTH,
      opacity: isActive.value ? 1 : withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(0, { duration: 0 })),
      transform: [
        {
          translateY: disableMove
            ? 0
            : isActive.value
            ? withSpring(menuProps.value.transformValue, SPRING_CONFIGURATION)
            : withTiming(-0.1, { duration: HOLD_ITEM_TRANSFORM_DURATION }),
        },
      ],
    };
  }, [activeOverlay, menuProps]);

  const animatedItemRowStyle = useAnimatedStyle(() => {
    if (!activeOverlay) {
      return {
        minHeight: 0,
        width: 0,
        marginLeft: 0,
        alignItems: 'flex-start' as const,
      };
    }

    return {
      minHeight: activeOverlay.itemRectHeight.value,
      width: activeOverlay.itemRectWidth.value,
      marginLeft: Math.max(0, activeOverlay.itemRectX.value),
      alignItems: 'flex-start' as const,
    };
  }, [activeOverlay]);

  return (
    <InternalContext.Provider value={internalContextVariables}>
      {children}
      <Modal
        visible={state.value === CONTEXT_MENU_STATE.ACTIVE || !!activeOverlay}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={closeMenuFromRN}
      >
        <View
          pointerEvents="box-none"
          style={[StyleSheet.absoluteFillObject, { zIndex: 9998 }]}
          collapsable={false}
        >
          <Pressable style={StyleSheet.absoluteFillObject} onPress={closeMenuFromRN}>
            <Backdrop />
          </Pressable>
          {activeOverlay ? (
            <Animated.View key={activeOverlay.id} pointerEvents="box-none" style={animatedOverlayStyle}>
              <Animated.View style={[styles.overlayItemRow, animatedItemRowStyle]}>
                <Pressable style={StyleSheet.absoluteFillObject} onPress={closeOverlayItemFromRN} />
                {activeOverlay.itemNode}
              </Animated.View>
            </Animated.View>
          ) : null}
          <Menu />
        </View>
      </Modal>
    </InternalContext.Provider>
  );
};

const Provider = memo(ProviderComponent);

export default Provider;

const styles = StyleSheet.create({
  overlayItemRow: {
    position: 'relative',
  },
});
