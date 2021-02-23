import { useMemo } from 'react';

import { IMenuItem } from '../components/menu/types';
import { nanoid } from 'nanoid/non-secure';

function useHoldMenuList(items: IMenuItem[]) {
  const menuItems = useMemo(() => {
    const withNano = items.map(item => {
      return {
        id: `hold-menu-item-${nanoid()}`,
        ...item,
      };
    });
    return withNano;
  }, [items]);

  return menuItems;
}

export default useHoldMenuList;
