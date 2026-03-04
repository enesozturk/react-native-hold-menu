import { useContext } from 'react';
import { InternalContext } from '../context';

export const useInternal = () => {
  const context = useContext(InternalContext);

  if (!context) {
    throw new Error(
      'react-native-hold-menu components must be wrapped in HoldMenuProvider.'
    );
  }

  return context;
};
