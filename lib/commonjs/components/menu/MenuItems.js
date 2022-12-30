"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MenuItemsComponent = ({
  items
}) => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, items.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: index,
      item: item,
      isLast: items.length === index + 1
    });
  }));
};

const MenuItems = /*#__PURE__*/(0, _react.memo)(MenuItemsComponent, _lodash.default);
var _default = MenuItems;
exports.default = _default;
//# sourceMappingURL=MenuItems.js.map