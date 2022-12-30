"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _portal = require("@gorhom/portal");

var _nonSecure = require("nanoid/non-secure");

var Haptics = _interopRequireWildcard(require("expo-haptics"));

var _calculations = require("../../utils/calculations");

var _constants = require("../../constants");

var _hooks = require("../../hooks");

var _styles = _interopRequireDefault(require("./styles"));

var _styleGuide = _interopRequireDefault(require("../../styleGuide"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//#region reanimated & gesture handler
//#endregion
//#region dependencies
//#endregion
//#region utils & types
const HoldItemComponent = ({
  items,
  bottom,
  containerStyles,
  disableMove,
  menuAnchorPosition,
  activateOn,
  hapticFeedback,
  actionParams,
  closeOnTap,
  children
}) => {
  //#region hooks
  const {
    state,
    menuProps,
    safeAreaInsets
  } = (0, _hooks.useInternal)();
  const deviceOrientation = (0, _hooks.useDeviceOrientation)(); //#endregion
  //#region variables

  const isActive = (0, _reactNativeReanimated.useSharedValue)(false);
  const isAnimationStarted = (0, _reactNativeReanimated.useSharedValue)(false);
  const itemRectY = (0, _reactNativeReanimated.useSharedValue)(0);
  const itemRectX = (0, _reactNativeReanimated.useSharedValue)(0);
  const itemRectWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  const itemRectHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const itemScale = (0, _reactNativeReanimated.useSharedValue)(1);
  const transformValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const transformOrigin = (0, _reactNativeReanimated.useSharedValue)(menuAnchorPosition || 'top-right');
  const key = (0, _react.useMemo)(() => `hold-item-${(0, _nonSecure.nanoid)()}`, []);
  const menuHeight = (0, _react.useMemo)(() => {
    const itemsWithSeparator = items.filter(item => item.withSeparator);
    return (0, _calculations.calculateMenuHeight)(items.length, itemsWithSeparator.length);
  }, [items]);
  const isHold = !activateOn || activateOn === 'hold'; //#endregion
  //#region refs

  const containerRef = (0, _reactNativeReanimated.useAnimatedRef)(); //#endregion
  //#region functions

  const hapticResponse = () => {
    const style = !hapticFeedback ? 'Medium' : hapticFeedback;

    switch (style) {
      case `Selection`:
        Haptics.selectionAsync();
        break;

      case `Light`:
      case `Medium`:
      case `Heavy`:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style]);
        break;

      case `Success`:
      case `Warning`:
      case `Error`:
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[style]);
        break;

      default:
    }
  }; //#endregion
  //#region worklet functions


  const activateAnimation = ctx => {
    'worklet';

    if (!ctx.didMeasureLayout) {
      const measured = (0, _reactNativeReanimated.measure)(containerRef);
      itemRectY.value = measured.pageY;
      itemRectX.value = measured.pageX;
      itemRectHeight.value = measured.height;
      itemRectWidth.value = measured.width;

      if (!menuAnchorPosition) {
        const position = (0, _calculations.getTransformOrigin)(measured.pageX, itemRectWidth.value, deviceOrientation === 'portrait' ? _constants.WINDOW_WIDTH : _constants.WINDOW_HEIGHT, bottom);
        transformOrigin.value = position;
      }
    }
  };

  const calculateTransformValue = () => {
    'worklet';

    const height = deviceOrientation === 'portrait' ? _constants.WINDOW_HEIGHT : _constants.WINDOW_WIDTH;
    const isAnchorPointTop = transformOrigin.value.includes('top');
    let tY = 0;

    if (!disableMove) {
      if (isAnchorPointTop) {
        const topTransform = itemRectY.value + itemRectHeight.value + menuHeight + _styleGuide.default.spacing + ((safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.bottom) || 0);
        tY = topTransform > height ? height - topTransform : 0;
      } else {
        const bottomTransform = itemRectY.value - menuHeight - ((safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.top) || 0);
        tY = bottomTransform < 0 ? -bottomTransform + _styleGuide.default.spacing * 2 : 0;
      }
    }

    return tY;
  };

  const setMenuProps = () => {
    'worklet';

    menuProps.value = {
      itemHeight: itemRectHeight.value,
      itemWidth: itemRectWidth.value,
      itemY: itemRectY.value,
      itemX: itemRectX.value,
      anchorPosition: transformOrigin.value,
      menuHeight: menuHeight,
      items,
      transformValue: transformValue.value,
      actionParams: actionParams || {}
    };
  };

  const scaleBack = () => {
    'worklet';

    itemScale.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION / 2
    });
  };

  const onCompletion = isFinised => {
    'worklet';

    const isListValid = items && items.length > 0;

    if (isFinised && isListValid) {
      state.value = _constants.CONTEXT_MENU_STATE.ACTIVE;
      isActive.value = true;
      scaleBack();

      if (hapticFeedback !== 'None') {
        (0, _reactNativeReanimated.runOnJS)(hapticResponse)();
      }
    }

    isAnimationStarted.value = false; // TODO: Warn user if item list is empty or not given
  };

  const scaleHold = () => {
    'worklet';

    itemScale.value = (0, _reactNativeReanimated.withTiming)(_constants.HOLD_ITEM_SCALE_DOWN_VALUE, {
      duration: _constants.HOLD_ITEM_SCALE_DOWN_DURATION
    }, onCompletion);
  };

  const scaleTap = () => {
    'worklet';

    isAnimationStarted.value = true;
    itemScale.value = (0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(_constants.HOLD_ITEM_SCALE_DOWN_VALUE, {
      duration: _constants.HOLD_ITEM_SCALE_DOWN_DURATION
    }), (0, _reactNativeReanimated.withTiming)(1, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION / 2
    }, onCompletion));
  };
  /**
   * When use tap activation ("tap") and trying to tap multiple times,
   * scale animation is called again despite it is started. This causes a bug.
   * To prevent this, it is better to check is animation already started.
   */


  const canCallActivateFunctions = () => {
    'worklet';

    const willActivateWithTap = activateOn === 'double-tap' || activateOn === 'tap';
    return willActivateWithTap && !isAnimationStarted.value || !willActivateWithTap;
  }; //#endregion
  //#region gesture events


  const gestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onActive: (_, context) => {
      if (canCallActivateFunctions()) {
        if (!context.didMeasureLayout) {
          activateAnimation(context);
          transformValue.value = calculateTransformValue();
          setMenuProps();
          context.didMeasureLayout = true;
        }

        if (!isActive.value) {
          if (isHold) {
            scaleHold();
          } else {
            scaleTap();
          }
        }
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;

      if (isHold) {
        scaleBack();
      }
    }
  });
  const overlayGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onActive: _ => {
      if (closeOnTap) state.value = _constants.CONTEXT_MENU_STATE.END;
    }
  }); //#endregion
  //#region animated styles & props

  const animatedContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const animateOpacity = () => (0, _reactNativeReanimated.withDelay)(_constants.HOLD_ITEM_TRANSFORM_DURATION, (0, _reactNativeReanimated.withTiming)(1, {
      duration: 0
    }));

    return {
      opacity: isActive.value ? 0 : animateOpacity(),
      transform: [{
        scale: isActive.value ? (0, _reactNativeReanimated.withTiming)(1, {
          duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
        }) : itemScale.value
      }]
    };
  });

  const containerStyle = _react.default.useMemo(() => [containerStyles, animatedContainerStyle], [containerStyles, animatedContainerStyle]);

  const animatedPortalStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const animateOpacity = () => (0, _reactNativeReanimated.withDelay)(_constants.HOLD_ITEM_TRANSFORM_DURATION, (0, _reactNativeReanimated.withTiming)(0, {
      duration: 0
    }));

    let tY = calculateTransformValue();

    const transformAnimation = () => disableMove ? 0 : isActive.value ? (0, _reactNativeReanimated.withSpring)(tY, _constants.SPRING_CONFIGURATION) : (0, _reactNativeReanimated.withTiming)(-0.1, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      opacity: isActive.value ? 1 : animateOpacity(),
      transform: [{
        translateY: transformAnimation()
      }, {
        scale: isActive.value ? (0, _reactNativeReanimated.withTiming)(1, {
          duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
        }) : itemScale.value
      }]
    };
  });
  const portalContainerStyle = (0, _react.useMemo)(() => [_styles.default.holdItem, animatedPortalStyle], [animatedPortalStyle]);
  const animatedPortalProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    pointerEvents: isActive.value ? 'auto' : 'none'
  })); //#endregion
  //#region animated effects

  (0, _reactNativeReanimated.useAnimatedReaction)(() => state.value, _state => {
    if (_state === _constants.CONTEXT_MENU_STATE.END) {
      isActive.value = false;
    }
  }); //#endregion
  //#region components

  const GestureHandler = (0, _react.useMemo)(() => {
    switch (activateOn) {
      case `double-tap`:
        return ({
          children: handlerChildren
        }) => /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TapGestureHandler, {
          numberOfTaps: 2,
          onHandlerStateChange: gestureEvent
        }, handlerChildren);

      case `tap`:
        return ({
          children: handlerChildren
        }) => /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TapGestureHandler, {
          numberOfTaps: 1,
          onHandlerStateChange: gestureEvent
        }, handlerChildren);
      // default is hold

      default:
        return ({
          children: handlerChildren
        }) => /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.LongPressGestureHandler, {
          minDurationMs: 150,
          onHandlerStateChange: gestureEvent
        }, handlerChildren);
    }
  }, [activateOn, gestureEvent]);
  const PortalOverlay = (0, _react.useMemo)(() => {
    return () => /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TapGestureHandler, {
      numberOfTaps: 1,
      onHandlerStateChange: overlayGestureEvent
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: _styles.default.portalOverlay
    }));
  }, [overlayGestureEvent]); //#endregion
  //#region render

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(GestureHandler, null, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    ref: containerRef,
    style: containerStyle
  }, children)), /*#__PURE__*/_react.default.createElement(_portal.Portal, {
    key: key,
    name: key
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    key: key,
    style: portalContainerStyle,
    animatedProps: animatedPortalProps
  }, /*#__PURE__*/_react.default.createElement(PortalOverlay, null), children))); //#endregion
};

const HoldItem = /*#__PURE__*/(0, _react.memo)(HoldItemComponent);
var _default = HoldItem;
exports.default = _default;
//# sourceMappingURL=HoldItem.js.map