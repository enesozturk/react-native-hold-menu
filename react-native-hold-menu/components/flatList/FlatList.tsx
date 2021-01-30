import React, { memo, useCallback } from "react";
import { FlatList as RNFlatList, } from "react-native";

import { useSharedValue } from "react-native-reanimated";
import { useLayout } from "../../hooks/useLayout";

import type { FlatListProps } from "./types";
import { CONTEXT_MENU_STATE } from "../../constants";

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
  // (
  //   <ListItem
  //     index={index}
  //     item={item}
  //     contextMenuState={contextMenuState}
  //     selectedItemIndex={selectedItemIndex}
  //     renderItem={_providedRenderItem}
  //   />
  // )
  const handleRenderItem = useCallback(
    ({ item, index }) => null,
    [contextMenuState, selectedItemIndex, _providedRenderItem]
  );

  return (
    <RNFlatList
      renderItem={handleRenderItem}
      onLayout={handleContainerLayout}
      {...rest}
    />
  );
  //#endregion
};

const FlatList = memo(FlatListComponent);

export default FlatList;
