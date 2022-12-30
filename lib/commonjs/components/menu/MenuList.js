"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _calculations = require("../../utils/calculations");

var _expoBlur = require("expo-blur");

var _MenuItems = _interopRequireDefault(require("./MenuItems"));

var _constants = require("../../constants");

var _styles = _interopRequireDefault(require("./styles"));

var _hooks = require("../../hooks");

var _validations = require("../../utils/validations");

var _calculations2 = require("./calculations");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AnimatedView = _reactNativeReanimated.default.createAnimatedComponent(_expoBlur.BlurView);

const MenuListComponent = () => {
  const {
    state,
    theme,
    menuProps
  } = (0, _hooks.useInternal)();

  const [itemList, setItemList] = _react.default.useState([]);

  const menuHeight = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator);
    return (0, _calculations.calculateMenuHeight)(menuProps.value.items.length, itemsWithSeparator.length);
  }, [menuProps]);
  const prevList = (0, _reactNativeReanimated.useSharedValue)([]);
  const messageStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator);
    const translate = (0, _calculations.menuAnimationAnchor)(menuProps.value.anchorPosition, menuProps.value.itemWidth, menuProps.value.items.length, itemsWithSeparator.length);

    const _leftPosition = (0, _calculations2.leftOrRight)(menuProps);

    const menuScaleAnimation = () => state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withSpring)(1, _constants.SPRING_CONFIGURATION_MENU) : (0, _reactNativeReanimated.withTiming)(0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });

    const opacityAnimation = () => (0, _reactNativeReanimated.withTiming)(state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [{
        translateX: translate.beginningTransformations.translateX
      }, {
        translateY: translate.beginningTransformations.translateY
      }, {
        scale: menuScaleAnimation()
      }, {
        translateX: translate.endingTransformations.translateX
      }, {
        translateY: translate.endingTransformations.translateY
      }]
    };
  });
  const animatedInnerContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      backgroundColor: theme.value === 'light' ? _constants.IS_IOS ? 'rgba(255, 255, 255, .75)' : 'rgba(255, 255, 255, .95)' : _constants.IS_IOS ? 'rgba(0,0,0,0.5)' : 'rgba(39, 39, 39, .8)'
    };
  }, [theme]);
  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      tint: theme.value
    };
  }, [theme]);

  const setter = items => {
    setItemList(items);
    prevList.value = items;
  };

  (0, _reactNativeReanimated.useAnimatedReaction)(() => menuProps.value.items, _items => {
    if (!(0, _validations.deepEqual)(_items, prevList.value)) {
      (0, _reactNativeReanimated.runOnJS)(setter)(_items);
    }
  }, [menuProps]);
  return /*#__PURE__*/_react.default.createElement(AnimatedView, {
    intensity: 100,
    animatedProps: animatedProps,
    style: [_styles.default.menuContainer, messageStyles]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_reactNative.StyleSheet.absoluteFillObject, _styles.default.menuInnerContainer, animatedInnerContainerStyle]
  }, /*#__PURE__*/_react.default.createElement(_MenuItems.default, {
    items: itemList
  })));
};

const MenuList = /*#__PURE__*/_react.default.memo(MenuListComponent);

var _default = MenuList;
exports.default = _default;
//# sourceMappingURL=MenuList.js.map