import type { SharedValue } from 'react-native-reanimated';

import { MENU_WIDTH } from '../../constants';
import {
  MENU_TEXT_DARK_COLOR,
  MENU_TEXT_DESTRUCTIVE_COLOR_DARK,
  MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT,
  MENU_TEXT_LIGHT_COLOR,
  MENU_TITLE_COLOR,
} from './constants';
import type { MenuInternalProps } from './types';

export const leftOrRight = (
	menuProps: SharedValue<MenuInternalProps>
) => {
	'worklet';

	const anchor = menuProps.value.anchorPosition;
	const anchorPositionHorizontal =
		typeof anchor === 'string' ? anchor.split('-')[1] : 'center';
	// Provide fallback to 0 if itemWidth is not yet set
	const itemWidth = menuProps.value.itemWidth || 0;

	let leftPosition = 0;
	if (anchorPositionHorizontal === 'right') {
		leftPosition = -MENU_WIDTH + itemWidth;
	} else if (anchorPositionHorizontal === 'left') {
		leftPosition = 0;
	} else {
		// Handle case when itemWidth is 0 (not yet measured)
		const halfMenuWidth = MENU_WIDTH / 2;
		const halfItemWidth = itemWidth / 2;
		leftPosition = itemWidth > 0 ? -halfMenuWidth + halfItemWidth : -halfMenuWidth;
	}

	return leftPosition;
};

export const getColor = (
  isTitle: boolean | undefined,
  isDestructive: boolean | undefined,
  themeValue: 'light' | 'dark'
) => {
  'worklet';
  return isTitle
    ? MENU_TITLE_COLOR
    : isDestructive
    ? themeValue === 'dark'
      ? MENU_TEXT_DESTRUCTIVE_COLOR_DARK
      : MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT
    : themeValue === 'dark'
    ? MENU_TEXT_DARK_COLOR
    : MENU_TEXT_LIGHT_COLOR;
};
