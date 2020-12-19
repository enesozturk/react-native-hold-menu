import { useCallback } from "react";
import Animated, { useSharedValue, useWorkletCallback } from "react-native-reanimated";

interface useLayoutParams {
  width?: Animated.SharedValue<number>,
  height?: Animated.SharedValue<number>,
  x?: Animated.SharedValue<number>,
  y?: Animated.SharedValue<number>,
}

export const useLayout = ({
  height: _providedHeight,
  width: _providedWidth

}: useLayoutParams) => {
  // callbacks
  const handleContainerLayout = useWorkletCallback(
    ({
      nativeEvent: {
        layout: { height, width },
      },
    }) => {
      
      if (_providedHeight) {
        _providedHeight.value = height;
      }

      if (_providedWidth) {
        _providedWidth.value = width;
      }
    },
    [_providedHeight, _providedWidth]
  );

  return {
    handleContainerLayout,
  };
};
