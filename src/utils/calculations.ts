import styleGuide from '../styleGuide';
import {
  MENU_WIDTH,
  MENU_TRANSFORM_ORIGIN_TOLERENCE,
  FONT_SCALE,
} from '../constants';

export const MenuItemHeight = () => {
  'worklet';
  return (
    styleGuide.typography.callout.lineHeight * FONT_SCALE +
    styleGuide.spacing * 2.5
  );
};

export const calculateMenuHeight = (
  itemLength: number,
  separatorCount: number
) => {
  'worklet';
  return (
    MenuItemHeight() * itemLength +
    (itemLength - 1) +
    separatorCount * styleGuide.spacing
  );
};

export type TransformOriginAnchorPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export const menuAnimationAnchor = (
  anchorPoint: TransformOriginAnchorPosition,
  itemWidth: number,
  itemLength: number,
  itemsWithSeparatorLength: number
) => {
  'worklet';
  const MenuHeight = calculateMenuHeight(itemLength, itemsWithSeparatorLength);
  const splittetAnchorName: string[] = anchorPoint.split('-');

  const Center1 = itemWidth;
  const Center2 = 0;

  const TyTop1 = -(MenuHeight / 2);
  const TyTop2 = MenuHeight / 2;

  const TxLeft1 = (MENU_WIDTH / 2) * -1;
  const TxLeft2 = (MENU_WIDTH / 2) * 1;

  return {
    beginningTransformations: {
      translateX:
        splittetAnchorName[1] === 'right'
          ? -TxLeft1
          : splittetAnchorName[1] === 'left'
          ? TxLeft1
          : Center1,
      translateY:
        splittetAnchorName[0] === 'top'
          ? TyTop1
          : splittetAnchorName[0] === 'bottom'
          ? TyTop1
          : Center2,
    },
    endingTransformations: {
      translateX:
        splittetAnchorName[1] === 'right'
          ? -TxLeft2
          : splittetAnchorName[1] === 'left'
          ? TxLeft2
          : Center2,
      translateY:
        splittetAnchorName[0] === 'top'
          ? TyTop2
          : splittetAnchorName[0] === 'bottom'
          ? -TyTop2
          : Center2,
    },
  };
};

export const getTransformOrigin = (
  posX: number,
  itemWidth: number,
  windowWidth: number,
  bottom?: boolean
): TransformOriginAnchorPosition => {
  'worklet';
  const distanceToLeft = Math.round(posX + itemWidth / 2);
  const distanceToRight = Math.round(windowWidth - distanceToLeft);

  let position: TransformOriginAnchorPosition = bottom
    ? 'bottom-right'
    : 'top-right';

  const majority = Math.abs(distanceToLeft - distanceToRight);

  if (majority < MENU_TRANSFORM_ORIGIN_TOLERENCE) {
    position = bottom ? 'bottom-center' : 'top-center';
  } else if (distanceToLeft < distanceToRight) {
    position = bottom ? 'bottom-left' : 'top-left';
  }

  return position;
};
