import { store } from "../../Store";
import { BackdropProps } from "./HoldMenuReducer";

export const HoldMenuActions = {
  SetBackDropState: (payload: BackdropProps) =>
    store.dispatch({ type: "SET_BACKDRROP_STATE", payload }),
};
