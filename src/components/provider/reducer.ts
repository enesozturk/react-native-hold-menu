import { CONTEXT_MENU_STATE } from "../../constants";

type StateProps = {
  active: number;
  activeItem: string | null;
  theme: "light" | "dark";
};

export const reducer = (state: StateProps, action: any) => {
  switch (action.type) {
    case "undetermined":
      return {
        ...state,
        active: CONTEXT_MENU_STATE.UNDETERMINED,
        activeItem: null,
      };
    case "active":
      return {
        ...state,
        active: CONTEXT_MENU_STATE.ACTIVE,
        activeItem: action.activeItem,
      };
    case "end":
      return {
        ...state,
        active: CONTEXT_MENU_STATE.END,
        activeItem: null,
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
  activeItem: null,
  theme: "light",
};
