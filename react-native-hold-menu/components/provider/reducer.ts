import { CONTEXT_MENU_STATE } from "../../constants";

type StateProps = {
  active: number;
  theme: "light" | "dark";
};

export const reducer = (state: StateProps, action: any) => {
  switch (action.type) {
    case "undetermined":
      return {
        ...state,
        active: CONTEXT_MENU_STATE.UNDETERMINED,
      };
    case "active":
      return {
        ...state,
        active: CONTEXT_MENU_STATE.ACTIVE,
      };
    case "end":
      return {
        ...state,
        active: CONTEXT_MENU_STATE.END,
      };
    case "toggle-theme":
      return {
        ...state,
        theme: state.theme == "dark" ? "light" : "dark",
      };
    default:
      return state.active;
  }
};

export const initialState = {
  active: 0,
  theme: "light",
};
