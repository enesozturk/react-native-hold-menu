export declare const MenuItemHeight: () => number;
export declare const calculateMenuHeight: (itemLength: number, separatorCount: number) => number;
export declare type TransformOriginAnchorPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
export declare const menuAnimationAnchor: (anchorPoint: TransformOriginAnchorPosition, itemWidth: number, itemLength: number, itemsWithSeparatorLength: number) => {
    beginningTransformations: {
        translateX: number;
        translateY: number;
    };
    endingTransformations: {
        translateX: number;
        translateY: number;
    };
};
export declare const getTransformOrigin: (posX: number, itemWidth: number, windowWidth: number, bottom?: boolean | undefined) => TransformOriginAnchorPosition;
