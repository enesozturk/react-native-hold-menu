"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = exports.reducer = exports.ActionType = void 0;

var _constants = require("../../constants");

let ActionType;
exports.ActionType = ActionType;

(function (ActionType) {
  ActionType["Active"] = "Active";
  ActionType["End"] = "End";
  ActionType["Theme"] = "Theme";
})(ActionType || (exports.ActionType = ActionType = {}));

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.Active:
      return { ...state,
        active: _constants.CONTEXT_MENU_STATE.ACTIVE,
        activeItem: action.activeItem
      };

    case ActionType.End:
      return { ...state,
        active: _constants.CONTEXT_MENU_STATE.END,
        activeItem: null
      };

    case ActionType.Theme:
      return { ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };

    default:
      return state;
  }
};

exports.reducer = reducer;
const initialState = {
  active: 0,
  activeItem: null,
  theme: 'light'
};
exports.initialState = initialState;
//# sourceMappingURL=reducer.js.map