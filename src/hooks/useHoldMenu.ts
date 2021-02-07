import { useContext } from "react";
import { HoldMenuContext } from "../contexts/external";

export const useBottomSheet = () => {
  return useContext(HoldMenuContext);
};
