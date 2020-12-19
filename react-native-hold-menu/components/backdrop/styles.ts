import { StyleSheet } from "react-native";
import { WINDOW_HEIGHT } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    height: WINDOW_HEIGHT,
  },
});
