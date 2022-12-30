"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const styleGuide = {
  spacing: 8,
  dimensionWidth: _reactNative.Dimensions.get('screen').width,
  dimensionHeight: _reactNative.Dimensions.get('screen').height,
  palette: {
    primary: '#0072ff',
    secondary: '#e2e2e2',
    common: {
      white: '#fff',
      black: '#000'
    }
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20
    },
    callout: {
      fontSize: 16,
      lineHeight: 20
    },
    callout2: {
      fontSize: 14,
      lineHeight: 18
    }
  }
};
var _default = styleGuide;
exports.default = _default;
//# sourceMappingURL=styleGuide.js.map