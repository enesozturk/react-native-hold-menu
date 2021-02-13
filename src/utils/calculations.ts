import { WINDOW_WIDTH } from '../constants';
import styleGuide from '../styleGuide';
import { MENU_WIDTH } from '../constants';

export const MenuItemHeight = () => {
  'worklet';
  return styleGuide.typography.callout.lineHeight + styleGuide.spacing * 2.5;
};

export const calculateMenuHeight = (itemLength: number) => {
  'worklet';
  return MenuItemHeight() * itemLength;
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
  itemLength: number
) => {
  'worklet';
  const MenuHeight = calculateMenuHeight(itemLength);
  const splittetAnchorName: string[] = anchorPoint.split('-');

  const Center1 = itemWidth;
  const Center2 = 0;

  const TyTop1 = -(MenuHeight / 2);
  const TyTop2 = MenuHeight / 2;

  const TxLeft1 = (MENU_WIDTH / 2) * -1;
  const TxLeft2 = (MENU_WIDTH / 2) * 1;

  return {
    begginingTransformations: {
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
          ? -TyTop1
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
  const distanceToLeft = posX + itemWidth / 2;
  const distanceToRight = windowWidth - distanceToLeft;

  let position: TransformOriginAnchorPosition = bottom
    ? 'bottom-right'
    : 'top-right';

  if (distanceToLeft < distanceToRight)
    position = bottom ? 'bottom-left' : 'top-left';
  else if (distanceToRight === distanceToLeft)
    position = bottom ? 'bottom-center' : 'top-center';

  return position;
};
