import { Dimensions } from "react-native";
import { useSharedValue as REAuseSharedValue } from "react-native-reanimated";
import React, { useRef } from "react";

export function useSharedValue<T>(value: T) {
  const ref = useRef<T>(null);
  if (ref.current === null) {
    // @ts-ignore
    ref.current = value;
  }

  return REAuseSharedValue(ref.current);
}
