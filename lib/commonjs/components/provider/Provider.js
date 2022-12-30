"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AnimatedIcon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _portal = require("@gorhom/portal");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _backdrop = require("../backdrop");

var _context = require("../../context");

var _constants = require("../../constants");

var _menu = _interopRequireDefault(require("../menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Components
// Utils
let AnimatedIcon;
exports.AnimatedIcon = AnimatedIcon;

const ProviderComponent = ({
  children,
  theme: selectedTheme,
  iconComponent,
  safeAreaInsets,
  disableBlur: isBlurDisabled = false
}) => {
  if (iconComponent) exports.AnimatedIcon = AnimatedIcon = _reactNativeReanimated.default.createAnimatedComponent(iconComponent);
  const state = (0, _reactNativeReanimated.useSharedValue)(_constants.CONTEXT_MENU_STATE.UNDETERMINED);
  const theme = (0, _reactNativeReanimated.useSharedValue)(selectedTheme || 'light');
  const disableBlur = (0, _reactNativeReanimated.useSharedValue)(isBlurDisabled);
  const menuProps = (0, _reactNativeReanimated.useSharedValue)({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    items: [],
    anchorPosition: 'top-center',
    menuHeight: 0,
    transformValue: 0,
    actionParams: {}
  });
  (0, _react.useEffect)(() => {
    theme.value = selectedTheme || 'light'; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);
  const internalContextVariables = (0, _react.useMemo)(() => ({
    state,
    theme,
    menuProps,
    safeAreaInsets: safeAreaInsets || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    disableBlur
  }), [state, theme, menuProps, safeAreaInsets, disableBlur]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_context.InternalContext.Provider, {
    value: internalContextVariables
  }, /*#__PURE__*/_react.default.createElement(_portal.PortalProvider, null, children, /*#__PURE__*/_react.default.createElement(_backdrop.Backdrop, null), /*#__PURE__*/_react.default.createElement(_menu.default, null))));
};

const Provider = /*#__PURE__*/(0, _react.memo)(ProviderComponent);
var _default = Provider;
exports.default = _default;
//# sourceMappingURL=Provider.js.map