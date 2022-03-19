"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _hooks = require("../../hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Icon = ({
  iconComponent,
  name
}) => {
  const {
    theme
  } = (0, _hooks.useInternal)();

  let AnimatedIcon = _reactNativeReanimated.default.createAnimatedComponent(iconComponent);

  const iconProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      color: theme.value === 'light' ? 'black' : 'white'
    };
  }, [theme]);
  return /*#__PURE__*/_react.default.createElement(AnimatedIcon, {
    name: name,
    size: 18,
    animatedProps: iconProps
  });
};

var _default = /*#__PURE__*/(0, _react.memo)(Icon);

exports.default = _default;
//# sourceMappingURL=Icon.js.map