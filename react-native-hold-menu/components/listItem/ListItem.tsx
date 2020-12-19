import React, { memo, useCallback, useMemo, useState } from "react";
import { Text, LayoutRectangle, View } from "react-native";
import { Portal } from "@gorhom/portal";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
  withTiming,
} from "react-native-reanimated";
import { CONTEXT_MENU_STATE } from "../../constants";
import { useLayout } from "../../hooks/useLayout";
import type { ListItemProps } from "./types";
import ListItemPopup from "../listItemPopup";

const ListItemComponent = ({
  index,
  item,
  contextMenuState,
  selectedItemIndex,
  renderItem,
}: ListItemProps) => {
  //#region state
  const [active, setActive] = useState(false);
  //#endregion

  //#region refs
  const containerRef = useAnimatedRef<Animated.View>();
  //#endregion

  //#region variables
  const itemRectY = useSharedValue<number>(0, false);
  const itemRectX = useSharedValue<number>(0, false);
  const itemRectWidth = useSharedValue<number>(0, false);
  const itemRectHeight = useSharedValue<number>(0, false);

  const { handleContainerLayout } = useLayout({
    height: itemRectHeight,
    width: itemRectWidth,
  });
  //#endregion

  //#region gesture
  const longPressGestureState = useSharedValue<State>(
    State.UNDETERMINED,
    false
  );
  const longPressGestureEvent = useAnimatedGestureHandler({
    onActive: ({ state }, context) => {
      if (!context.didMeasureLayout) {
        try {
          const measured = measure(containerRef);
          itemRectY.value = measured.pageY;
          itemRectX.value = measured.pageX;
          context.didMeasureLayout = true;
        } catch {}
      }

      if (longPressGestureState.value !== state) {
        longPressGestureState.value = state;
        selectedItemIndex.value = index;
        contextMenuState.value = CONTEXT_MENU_STATE.ACTIVE;
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;
    },
  });
  //#endregion

  //#region styles
  const animatedContainerStyle = useAnimatedStyle(() => {
    const animateTranslateY = (position: number) =>
      withTiming(position, {
        duration: 75,
      });
    return {
      transform: [
        {
          translateY: animateTranslateY(
            longPressGestureState.value === State.ACTIVE ? -25 : 0
          ),
        },
      ],
    };
  });
  const containerStyle = useMemo(() => [animatedContainerStyle], [
    animatedContainerStyle,
  ]);
  const popupContainerStyle = useAnimatedStyle(() => {
    const animateTranslateY = (position: number) =>
      withTiming(position, {
        duration: 75,
      });

    console.log("X", longPressGestureState.value, itemRectHeight.value);
    return {
      position: "absolute",
      top: itemRectY.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      transform: [
        {
          translateY: animateTranslateY(
            longPressGestureState.value === State.ACTIVE ? -25 : 0
          ),
        },
      ],
    };
  });
  //#endregion

  const animatedPopupProps = useAnimatedProps(() => ({
    pointerEvents:
      longPressGestureState.value === State.ACTIVE ? "auto" : "none",
  }));

  //#region effects
  useAnimatedReaction(
    () =>
      contextMenuState.value === CONTEXT_MENU_STATE.END &&
      longPressGestureState.value === State.ACTIVE,
    (shouldReset) => {
      if (shouldReset) {
        longPressGestureState.value = State.END;
      }
    }
  );
  useAnimatedReaction(
    () =>
      contextMenuState.value === CONTEXT_MENU_STATE.ACTIVE &&
      longPressGestureState.value === State.ACTIVE,
    (shouldMount) => {
      if (shouldMount) {
        runOnJS(setActive)(true);
      } else {
        runOnJS(setActive)(false);
      }
    }
  );
  //#endregion

  //#region renders
  const renderContent = useCallback(() => renderItem({ item, index }), [
    renderItem,
    item,
    index,
  ]);
  return (
    <>
      <LongPressGestureHandler
        minDurationMs={300}
        onHandlerStateChange={longPressGestureEvent}
      >
        <Animated.View
          onLayout={handleContainerLayout}
          ref={containerRef}
          style={containerStyle}
        >
          {renderContent()}
        </Animated.View>
      </LongPressGestureHandler>

      <Portal key={`portal-${index}`} name={`portal-${index}`}>
        <Animated.View
          pointerEvents="none"
          key={`item-${index}`}
          style={popupContainerStyle}
          animatedProps={animatedPopupProps}
        >
          {active && renderContent()}
        </Animated.View>
      </Portal>
    </>
  );
  //#endregion
};

const ListItem = memo(ListItemComponent);

export default ListItem;
