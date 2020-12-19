import React, { memo, useMemo, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Portal } from "@gorhom/portal";
import { CONTEXT_MENU_STATE } from "../../constants";
import type { ListItemPopupProps } from "./types";
import { State } from "react-native-gesture-handler";
import { Text } from "react-native";

const ListItemPopupComponent = ({
  contextMenuState,
  longPressGestureState,
  itemRectY,
  itemRectX,
  itemRectHeight,
  itemRectWidth,
  renderContent,
}: ListItemPopupProps) => {
  //#region state
  const [active, setActive] = useState(false);
  //#endregion

  //#region style
  const animatedContainerStyle = useAnimatedStyle(() => {
    const animateTranslateY = (position: number) =>
      withTiming(position, {
        duration: 75,
      });
    return {
      top: itemRectY.value,
      // left: itemRectX.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      // transform: [
      //   {
      //     translateY: animateTranslateY(
      //       longPressGestureState.value === State.ACTIVE ? -25 : 0
      //     ),
      //   },
      // ],
    };
  });
  const containerStyle = useMemo(
    () => [
      {
        position: "absolute",
        background: "black",
        zIndex: 9999
      },
      animatedContainerStyle,
    ],
    [animatedContainerStyle]
  );
  //#endregion

  //#region effects
  // useAnimatedReaction(
  //   () =>
  //     contextMenuState.value === CONTEXT_MENU_STATE.ACTIVE &&
  //     longPressGestureState.value === State.ACTIVE,
  //   (shouldMount) => {
  //     if (shouldMount) {
  //       runOnJS(setActive)(true);
  //     } else {
  //       runOnJS(setActive)(false);
  //     }
  //   }
  // );
  //#endregion

  //#region renders
  return (
    <Animated.View style={containerStyle}>
      <Text>
        {itemRectHeight.value} x {itemRectWidth.value}
      </Text>
      <Text>
        {itemRectX.value} x {itemRectY.value}
      </Text>
    </Animated.View>
  );
  //#endregion
};

const ListItemPopup = memo(ListItemPopupComponent);

export default ListItemPopup;
