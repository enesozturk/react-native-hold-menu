import React from "react";

import { Portal } from "@gorhom/portal";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
    measure,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedProps,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

// Components
import Menu from '../menu'

// Utils
import { WINDOW_WIDTH } from "../../constants";
import { useLayout } from "../../hooks/useLayout";
import { HOLD_ITEM_TRANSFORM_DURATION } from "../../constants";
import type { HoldItemProps } from "./types";
import { TransformOriginAnchorPosition } from "../../utils/calculations";

const HoldItemComponent = ({
    id,
    children,
    items,
    isActive,
    handleActivate,
    menuAnchorPosition,
    theme
}: HoldItemProps) => {
    const containerRef = useAnimatedRef<Animated.View>();
    const longPressGestureState = useSharedValue<State>(
        State.UNDETERMINED,
        false
    );
    const itemRectY = useSharedValue<number>(0, false);
    const itemRectX = useSharedValue<number>(0, false);
    const itemRectWidth = useSharedValue<number>(0, false);
    const itemRectHeight = useSharedValue<number>(0, false);

    const getTransformOrigin = (posX: number, posY: number) => {
        'worklet'
        const distanceToLeft = posX + (itemRectWidth.value / 2)
        const distanceToRight = WINDOW_WIDTH - distanceToLeft

        if (distanceToLeft < distanceToRight)
            return "top-left"
        else if (distanceToRight == distanceToLeft) return "top-center"
        else return "top-right"
    }
    const transformOrigin = useSharedValue<TransformOriginAnchorPosition>(menuAnchorPosition || "top-right")

    React.useEffect(() => {
        if (!isActive)
            longPressGestureState.value = State.END
    }, [isActive])

    const { handleContainerLayout } = useLayout({
        height: itemRectHeight,
        width: itemRectWidth,
    });

    const itemScale = useSharedValue(1)

    const activateAnimation = (ctx: any) => {
        'worklet'
        if (!ctx.didMeasureLayout) {
            const measured = measure(containerRef);
            itemRectY.value = measured.pageY;
            itemRectX.value = measured.pageX;
            if (!menuAnchorPosition)
                transformOrigin.value = getTransformOrigin(measured.pageX, measured.pageY)
        }
    }

    const scaleBack = () => {
        'worklet'
        itemScale.value = withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION / 2 })
    }

    const longPressGestureEvent = useAnimatedGestureHandler({
        onActive: ({ state: handlerState }, context) => {
            activateAnimation(context)
            context.didMeasureLayout = true;

            if (longPressGestureState.value !== State.ACTIVE) {
                itemScale.value = withTiming(0.5, { duration: HOLD_ITEM_TRANSFORM_DURATION }, (isFinised) => {
                    if (isFinised) {
                        runOnJS(handleActivate)()
                        itemScale.value = 1
                        longPressGestureState.value = handlerState
                    }
                })
            }
        },
        onFinish: (_, context) => {
            context.didMeasureLayout = false;
            if (longPressGestureState.value !== State.ACTIVE) scaleBack()
        },
    });

    const animatedContainerStyle = useAnimatedStyle(() => {
        const isAnimationActive = longPressGestureState.value === State.ACTIVE
        const animateOpacity = () =>
            withDelay(HOLD_ITEM_TRANSFORM_DURATION,
                withTiming(1, { duration: 0 }))

        return {
            opacity: isAnimationActive ? 0 : animateOpacity(),
            transform: [{
                scale: isAnimationActive ?
                    withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION }) :
                    itemScale.value
            }]
        };
    });
    const containerStyle = React.useMemo(() => [animatedContainerStyle], [
        animatedContainerStyle
    ]);

    const animatedPortalStyle = useAnimatedStyle(() => {
        const isAnimationActive = longPressGestureState.value === State.ACTIVE

        const animateOpacity = () =>
            withDelay(HOLD_ITEM_TRANSFORM_DURATION,
                withTiming(0, { duration: 0 }))

        return {
            zIndex: 10,
            position: "absolute",
            top: itemRectY.value,
            left: itemRectX.value,
            width: itemRectWidth.value,
            height: itemRectHeight.value,
            opacity: isAnimationActive ? 1 : animateOpacity(),
            transform: [
                {
                    translateY: withTiming(isAnimationActive ? -115 : -0.1, {
                        duration: HOLD_ITEM_TRANSFORM_DURATION,
                    })
                },
                {
                    scale: isAnimationActive ?
                        withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION }) :
                        itemScale.value
                }
            ],
        };
    })
    const portalContainerStyle = React.useMemo(() => [animatedPortalStyle], [
        animatedPortalStyle
    ]);

    const animatedPortalProps = useAnimatedProps(() => ({
        pointerEvents:
            longPressGestureState.value === State.ACTIVE ? "auto" : "none",
    }));

    return (
        <>
            <LongPressGestureHandler
                minDurationMs={100}
                onHandlerStateChange={longPressGestureEvent}
            >
                <Animated.View
                    onLayout={handleContainerLayout}
                    ref={containerRef}
                    style={containerStyle}>
                    {children}
                </Animated.View>
            </LongPressGestureHandler>

            <Portal>
                <Animated.View
                    pointerEvents="none"
                    key={`item-${id}`}
                    style={portalContainerStyle}
                    animatedProps={animatedPortalProps}>
                    {children}
                    <Menu
                        id={id}
                        items={items}
                        isActive={isActive}
                        itemHeight={itemRectHeight.value}
                        itemWidth={itemRectWidth.value}
                        anchorPosition={transformOrigin.value}
                        theme={theme} />
                </Animated.View>
            </Portal>
        </>
    );
};

const HoldItem = React.memo(HoldItemComponent);

export default HoldItem;
