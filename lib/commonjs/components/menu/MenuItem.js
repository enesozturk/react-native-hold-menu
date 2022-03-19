"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _Separator = _interopRequireDefault(require("./Separator"));

var _styles = _interopRequireDefault(require("./styles"));

var _hooks = require("../../hooks");

var _constants = require("../../constants");

var _constants2 = require("./constants");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _calculations = require("./calculations");

var _Provider = require("../provider/Provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ItemComponent = _constants.IS_IOS ? _reactNative.TouchableOpacity : _reactNativeGestureHandler.TouchableOpacity;

const AnimatedTouchable = _reactNativeReanimated.default.createAnimatedComponent(ItemComponent);

const MenuItemComponent = ({
  item,
  isLast
}) => {
  const {
    state,
    theme,
    menuProps
  } = (0, _hooks.useInternal)();
  const opacity = (0, _reactNativeReanimated.useSharedValue)(1);
  const borderStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const borderBottomColor = theme.value === 'dark' ? _constants2.BORDER_DARK_COLOR : _constants2.BORDER_LIGHT_COLOR;
    return {
      borderBottomColor,
      borderBottomWidth: isLast ? 0 : 1
    };
  }, [theme, isLast, item]);
  const textColor = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      color: (0, _calculations.getColor)(item.isTitle, item.isDestructive, theme.value)
    };
  }, [theme, item]);
  const handleOnPress = (0, _react.useCallback)(() => {
    if (!item.isTitle) {
      const params = menuProps.value.actionParams[item.text] || [];
      if (item.onPress) item.onPress(...params);
      state.value = _constants.CONTEXT_MENU_STATE.END;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [state, item]);
  const pressInStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: opacity.value
    };
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(AnimatedTouchable, {
    onPressIn: () => opacity.value = 0.4,
    onPressOut: () => opacity.value = 1,
    onPress: handleOnPress,
    activeOpacity: !item.isTitle ? 0.4 : 1,
    style: [_styles.default.menuItem, borderStyles, pressInStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Text, {
    style: [item.isTitle ? _styles.default.menuItemTitleText : _styles.default.menuItemText, textColor]
  }, item.text), !item.isTitle && item.icon && /*#__PURE__*/_react.default.createElement(_Provider.AnimatedIcon, {
    name: item.icon,
    size: 18,
    style: textColor
  })), item.withSeparator && /*#__PURE__*/_react.default.createElement(_Separator.default, null));
};

const MenuItem = /*#__PURE__*/_react.default.memo(MenuItemComponent, _lodash.default);

var _default = MenuItem;
exports.default = _default;
//# sourceMappingURL=MenuItem.js.map