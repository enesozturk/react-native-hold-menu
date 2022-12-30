import React, { memo } from 'react';
import MenuItem from './MenuItem';
import isEqual from 'lodash.isequal';

const MenuItemsComponent = ({
  items
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, items.map((item, index) => {
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: index,
      item: item,
      isLast: items.length === index + 1
    });
  }));
};

const MenuItems = /*#__PURE__*/memo(MenuItemsComponent, isEqual);
export default MenuItems;
//# sourceMappingURL=MenuItems.js.map