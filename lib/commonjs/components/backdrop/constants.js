"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BACKDROP_DARK_BACKGROUND_COLOR = exports.BACKDROP_LIGHT_BACKGROUND_COLOR = void 0;

var _constants = require("../../constants");

const BACKDROP_LIGHT_BACKGROUND_COLOR = _constants.IS_IOS ? 'rgba(0,0,0,0.2)' : 'rgba(19, 19, 19, 0.95)';
exports.BACKDROP_LIGHT_BACKGROUND_COLOR = BACKDROP_LIGHT_BACKGROUND_COLOR;
const BACKDROP_DARK_BACKGROUND_COLOR = _constants.IS_IOS ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.95)';
exports.BACKDROP_DARK_BACKGROUND_COLOR = BACKDROP_DARK_BACKGROUND_COLOR;
//# sourceMappingURL=constants.js.map