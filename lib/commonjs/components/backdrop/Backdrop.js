"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _expoBlur = require("expo-blur");

var _styles = require("./styles");

var _constants = require("../../constants");

var _constants2 = require("./constants");

var _hooks = require("../../hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Components
// Utils
const BackdropComponent = () => {
  const {
    state,
    theme,
    disableBlur
  } = (0, _hooks.useInternal)();
  const AnimatedBlurView = (0, _react.useMemo)(() => (disableBlur === null || disableBlur === void 0 ? void 0 : disableBlur.value) === false && _constants.IS_IOS ? _reactNativeReanimated.default.createAnimatedComponent(_expoBlur.BlurView) : _reactNativeReanimated.default.View, [disableBlur]);
  const tapGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (event, context) => {
      context.startPosition = {
        x: event.x,
        y: event.y
      };
    },
    onCancel: () => {
      state.value = _constants.CONTEXT_MENU_STATE.END;
    },
    onEnd: (event, context) => {
      const distance = Math.hypot(event.x - context.startPosition.x, event.y - context.startPosition.y);
      const shouldClose = distance < 10;
      const isStateActive = state.value === _constants.CONTEXT_MENU_STATE.ACTIVE;

      if (shouldClose && isStateActive) {
        state.value = _constants.CONTEXT_MENU_STATE.END;
      }
    }
  }, [state]);
  const animatedContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const topValueAnimation = () => state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 0 : (0, _reactNativeReanimated.withDelay)(_constants.HOLD_ITEM_TRANSFORM_DURATION, (0, _reactNativeReanimated.withTiming)(_constants.WINDOW_HEIGHT, {
      duration: 0
    }));

    const opacityValueAnimation = () => (0, _reactNativeReanimated.withTiming)(state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation()
    };
  });
  const animatedContainerProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      intensity: (0, _reactNativeReanimated.withTiming)(state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 100 : 0, {
        duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
      })
    };
  });
  const animatedInnerContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    // if blur is disabled, change the android black background to the same as Ios
    const backgroundColor = theme.value === 'light' ? disableBlur ? _constants2.BACKDROP_NO_BLUR_LIGHT_BACKGROUND_COLOR : _constants2.BACKDROP_LIGHT_BACKGROUND_COLOR : disableBlur ? _constants2.BACKDROP_NO_BLUR_DARK_BACKGROUND_COLOR : _constants2.BACKDROP_DARK_BACKGROUND_COLOR;
    return {
      backgroundColor
    };
  }, [theme]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TapGestureHandler, {
    onHandlerStateChange: tapGestureEvent
  }, /*#__PURE__*/_react.default.createElement(AnimatedBlurView // @ts-ignore
  , {
    tint: "default",
    animatedProps: animatedContainerProps,
    style: [_styles.styles.container, animatedContainerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [{ ..._reactNative.StyleSheet.absoluteFillObject
    }, animatedInnerContainerStyle]
  })));
};

const Backdrop = /*#__PURE__*/(0, _react.memo)(BackdropComponent);
var _default = Backdrop;
exports.default = _default;
//# sourceMappingURL=Backdrop.js.map