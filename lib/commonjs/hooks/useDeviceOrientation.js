"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactNative = require("react-native");

function getWindowOrientation() {
  const {
    width,
    height
  } = _reactNative.Dimensions.get('window');

  return height >= width ? 'portrait' : 'landscape';
}

function useDeviceOrientation() {
  const [deviceOrientation, setDeviceOrientation] = (0, _react.useState)(getWindowOrientation);
  (0, _react.useEffect)(() => {
    function updateState() {
      setDeviceOrientation(getWindowOrientation());
    }

    _reactNative.Dimensions.addEventListener('change', updateState);

    return () => _reactNative.Dimensions.removeEventListener('change', updateState);
  }, []);
  return deviceOrientation;
}

var _default = useDeviceOrientation;
exports.default = _default;
//# sourceMappingURL=useDeviceOrientation.js.map