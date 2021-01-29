import { CONTEXT_MENU_STATE } from "../../constants";

type StateProps = {
  active: number;
};

export const reducer = (state: StateProps = initialState, action: any) => {
  switch (action.type) {
    case "undetermined":
      return {
        active: CONTEXT_MENU_STATE.UNDETERMINED,
      };
    case "active":
      return {
        active: CONTEXT_MENU_STATE.ACTIVE,
      };
    case "end":
      return {
        active: CONTEXT_MENU_STATE.END,
      };
    default:
      return state.active;
  }
};

export const initialState = {
  active: 0,
};
