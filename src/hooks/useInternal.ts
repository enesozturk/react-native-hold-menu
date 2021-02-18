import { useContext } from 'react';
import { InternalContext } from '../context/internal';

export const useInternal = () => {
  const context = useContext(InternalContext);

  if (context === null) {
    throw new Error(
      "Internal context cannot be null, please add 'Provider' to the root component."
    );
  }

  return context;
};
