import { Dimensions } from "react-native";

const StyleGuide = {
  spacing: 8,
  dimensionWidth: Dimensions.get("screen").width,
  dimensionHeight: Dimensions.get("screen").height,
  palette: {
    primary: "#0072ff",
    secondary: "#e2e2e2",
    tertiary: "#38ffb3",
    backgroundPrimary: "#d5e5ff",
    background: "#f2f2f2",
    border: "#f2f2f2",
    common: {
      white: "#fff",
      black: "#000",
    },
    whatsapp: {
      chatBackground: "rgb(230, 211, 214)",
      messageBackgroundSender: "rgb(218, 248, 201)",
      messageBackgroundReceiver: "white",
      messageText: "rgb(67, 70, 65)",
      seenCheckColor: "rgb(110,193,242)",
      deliveredCheckColor: "gray",
    },
    messageBackground: "rgb(230, 211, 214)",
    messageItemBackground: "rgb(218, 248, 201)",
    messageText: "rgb(67, 70, 65)",
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      color: "#999999",
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
    },
  },
};

export default StyleGuide;
