"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _hooks = require("../../hooks");

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Separator = () => {
  const {
    theme
  } = (0, _hooks.useInternal)();
  const separatorStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      backgroundColor: theme.value === 'dark' ? _constants.BORDER_DARK_COLOR : _constants.BORDER_LIGHT_COLOR
    };
  }, [theme]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.separator, { ...separatorStyles
    }]
  });
};

var _default = /*#__PURE__*/(0, _react.memo)(Separator);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  separator: {
    width: '100%',
    height: 8
  }
});
//# sourceMappingURL=Separator.js.map