"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _constants = require("../../constants");

var _styleGuide = _interopRequireDefault(require("../../styleGuide"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = _reactNative.StyleSheet.create({
  menuWrapper: {
    position: 'absolute',
    left: 0,
    zIndex: 10
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: _constants.MENU_WIDTH,
    borderRadius: _styleGuide.default.spacing * 1.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    zIndex: 15
  },
  menuInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: _styleGuide.default.spacing * 2,
    paddingVertical: _styleGuide.default.spacing * 1.25
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)'
  },
  menuItemText: {
    fontSize: _styleGuide.default.typography.callout.fontSize,
    lineHeight: _styleGuide.default.typography.callout.lineHeight,
    textAlign: 'left',
    width: '100%',
    flex: 1
  },
  menuItemTitleText: {
    fontSize: _styleGuide.default.typography.callout2.fontSize,
    lineHeight: _styleGuide.default.typography.callout2.lineHeight,
    textAlign: 'center',
    width: '100%',
    flex: 1
  },
  textDark: {
    color: 'black'
  },
  textLight: {
    color: 'white'
  }
});

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map