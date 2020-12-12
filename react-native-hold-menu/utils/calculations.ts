import StyleGuide from "../components/StyleGuide";
import { MenuItems } from "../variables";

export const MenuItemHeight = () => {
  "worklet";
  return StyleGuide.typography.callout.lineHeight + StyleGuide.spacing * 2.5;
};

export const CalculateMenuHeight = (itemLength: number) => {
  "worklet";
  return MenuItemHeight() * itemLength;
};
export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export type TransformOriginAnchorPoint =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export const MenuAnimationAnchor = (
  anchorPoint: TransformOriginAnchorPoint
) => {
  "worklet";
  const MenuHeight = CalculateMenuHeight(MenuItems.length);

  const Center = 0;

  const TyTop1 = (-1 * MenuHeight) / 2;
  const TyTop2 = MenuHeight / 2;

  const TxLeft1 = (MENU_WIDTH / 2) * -1;
  const TxLeft2 = (MENU_WIDTH / 2) * 1;

  const splittetAnchorName: string[] = anchorPoint.split("-");

  return {
    begginingTransformations: {
      translateX:
        splittetAnchorName[1] == "right"
          ? -TxLeft1
          : splittetAnchorName[1] == "left"
          ? TxLeft1
          : Center,
      translateY:
        splittetAnchorName[0] == "top"
          ? TyTop1
          : splittetAnchorName[0] == "bottom"
          ? -TyTop1
          : Center,
    },
    endingTransformations: {
      translateX:
        splittetAnchorName[1] == "right"
          ? -TxLeft2
          : splittetAnchorName[1] == "left"
          ? TxLeft2
          : Center,
      translateY:
        splittetAnchorName[0] == "top"
          ? TyTop2
          : splittetAnchorName[0] == "bottom"
          ? -TyTop2
          : Center,
    },
  };
};
