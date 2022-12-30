import React from 'react';
import { MenuItemProps } from './types';
declare type MenuItemComponentProps = {
    item: MenuItemProps;
    isLast?: boolean;
};
declare const MenuItem: React.MemoExoticComponent<({ item, isLast }: MenuItemComponentProps) => JSX.Element>;
export default MenuItem;
