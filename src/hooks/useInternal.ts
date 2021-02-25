import { useContext } from 'react';
import { InternalContext } from '../context';

export const useInternal = () => useContext(InternalContext);
