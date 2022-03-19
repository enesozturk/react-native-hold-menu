"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _MenuList = _interopRequireDefault(require("./MenuList"));

var _styles = _interopRequireDefault(require("./styles"));

var _hooks = require("../../hooks");

var _constants = require("../../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MenuComponent = () => {
  const {
    state,
    menuProps
  } = (0, _hooks.useInternal)();
  const wrapperStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];
    const top = anchorPositionVertical === 'top' ? menuProps.value.itemHeight + menuProps.value.itemY + 8 : menuProps.value.itemY - 8;
    const left = menuProps.value.itemX;
    const width = menuProps.value.itemWidth;
    const tY = menuProps.value.transformValue;
    return {
      top,
      left,
      width,
      transform: [{
        translateY: state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withSpring)(tY, _constants.SPRING_CONFIGURATION) : (0, _reactNativeReanimated.withTiming)(0, {
          duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
        })
      }]
    };
  }, [menuProps]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles.default.menuWrapper, wrapperStyles]
  }, /*#__PURE__*/_react.default.createElement(_MenuList.default, null));
};

const Menu = /*#__PURE__*/_react.default.memo(MenuComponent);

var _default = Menu;
exports.default = _default;
//# sourceMappingURL=Menu.js.map