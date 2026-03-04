import { memo } from 'react';

import MenuItem from './MenuItem';
import type { MenuItemProps } from './types';

const MenuItemsComponent = ({ items }: { items: MenuItemProps[] }) => {
  return (
    <>
      {items.map((item: MenuItemProps, index: number) => {
        return (
          <MenuItem
            key={index}
            item={item}
            isLast={items.length === index + 1}
          />
        );
      })}
    </>
  );
};

const MenuItems = memo(MenuItemsComponent);

export default MenuItems;
