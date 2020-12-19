import React, { memo, useCallback } from "react";
import { FlatList as RNFlatList, View } from "react-native";
import { PortalHost } from '@gorhom/portal'
import { useSharedValue } from "react-native-reanimated";
import { useLayout } from "../../hooks/useLayout";
import ListItem from "../listItem";
import Backdrop from "../backdrop";

import type { FlatListProps } from "./types";
import { CONTEXT_MENU_STATE, WINDOW_HEIGHT } from "../../constants";
import ListCellRenderer from "../listItemPopup";

const FlatListComponent = ({
  renderItem: _providedRenderItem,
  onLayout,
  ...rest
}: FlatListProps<never>) => {
  //#region hooks
  const containerHeight = useSharedValue(0, false);
  const { handleContainerLayout } = useLayout({
    height: containerHeight,
  });

  const contextMenuState = useSharedValue<CONTEXT_MENU_STATE>(
    CONTEXT_MENU_STATE.UNDETERMINED,
    false
  );
  const selectedItemIndex = useSharedValue<number>(-1, false);
  const selectedItemY = useSharedValue<number>(-1, false);
  //#endregion

  //#region renders
  const handleRenderItem = useCallback(
    ({ item, index }) => (
      <ListItem
        index={index}
        item={item}
        contextMenuState={contextMenuState}
        selectedItemIndex={selectedItemIndex}
        renderItem={_providedRenderItem}
      />
    ),
    [contextMenuState, selectedItemIndex, _providedRenderItem]
  );

  // const handleCellRendererComponent = useCallback(
  //   ({ children, index, ...props }) => (
  //     <ListCellRenderer
  //       contextMenuState={contextMenuState}
  //       selectedItemIndex={selectedItemIndex}
  //       index={index}
  //       children={children}
  //       {...props}
  //     />
  //   ),
  //   [contextMenuState, selectedItemIndex]
  // );
  return (
    <PortalHost>
      <RNFlatList
        renderItem={handleRenderItem}
        onLayout={handleContainerLayout}
        {...rest}
      />
      <Backdrop contextMenuState={contextMenuState} />
    </PortalHost>
  );
  //#endregion
};

const FlatList = memo(FlatListComponent);

export default FlatList;
