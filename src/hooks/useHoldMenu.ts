import { useContext } from 'react';
import { HoldMenuContext } from '../components/provider';

export const useHoldMenu = () => {
  return useContext(HoldMenuContext);
};
