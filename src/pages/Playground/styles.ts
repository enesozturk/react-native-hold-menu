import { StyleSheet } from "react-native";
import { WINDOW_WIDTH } from "../../constants";
import StyleGuide from "../../components/StyleGuide";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: StyleGuide.spacing * 4,
    alignItems: "center",
  },
  item: {
    width: WINDOW_WIDTH / 5,
    height: 70,
    paddingVertical: StyleGuide.spacing,
    backgroundColor: StyleGuide.palette.primary,
    borderRadius: StyleGuide.spacing * 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: StyleGuide.palette.primaryDark,
  },
  topRight: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  topLeft: {
    position: "absolute",
    top: -5,
    left: -5,
  },
  topCenter: {
    position: "absolute",
    top: -5,
  },
});

export default styles;
