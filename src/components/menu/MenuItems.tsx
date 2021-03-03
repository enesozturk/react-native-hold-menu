import React, { memo } from 'react';

import MenuItem from './MenuItem';

import isEqual from 'lodash.isequal';
import { MenuItemProps } from './types';

const MenuItemsComponent = ({
  items,
  theme,
}: {
  items: MenuItemProps[];
  theme: 'light' | 'dark';
}) => {
  return (
    <>
      {items.map((item: MenuItemProps, index: number) => {
        return (
          <MenuItem
            key={index}
            item={item}
            isLast={items.length === index + 1}
            theme={theme}
          />
        );
      })}
    </>
  );
};

const MenuItems = memo(MenuItemsComponent, isEqual);

export default MenuItems;
