import React, { memo, useCallback, useMemo, useState } from "react";
import { View } from "react-native";
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
    withSequence
} from "react-native-reanimated";

// Components
import Menu from '../menu'

// Utils
import { CONTEXT_MENU_STATE } from "../../constants";
import { useLayout } from "../../hooks/useLayout";
import { HoldMenuContext } from "../provider/Provider";
import { HOLD_ITEM_TRANSFORM_DURATION } from "../../constants";
import type { HoldItemProps } from "./types";

const HoldItemComponent = ({
    id,
    children,
    items,
}: HoldItemProps) => {
    //#region state
    const [state, dispatch] = React.useContext(HoldMenuContext)

    //#endregion

    //#region refs
    const containerRef = useAnimatedRef<Animated.View>();
    //#endregion

    //#region variables
    const itemRectY = useSharedValue<number>(0, false);
    const itemRectX = useSharedValue<number>(0, false);
    const itemRectWidth = useSharedValue<number>(0, false);
    const itemRectHeight = useSharedValue<number>(0, false);

    const { handleContainerLayout } = useLayout({
        height: itemRectHeight,
        width: itemRectWidth,
    });
    //#endregion

    //#region gesture
    const handleActivate = () => {
        dispatch({ type: 'active' })
    }
    const longPressGestureState = useSharedValue<State>(
        State.UNDETERMINED,
        false
    );
    const longPressGestureEvent = useAnimatedGestureHandler({
        onActive: ({ state: handlerState }, context) => {
            if (!context.didMeasureLayout) {
                try {
                    const measured = measure(containerRef);
                    itemRectY.value = measured.pageY;
                    itemRectX.value = measured.pageX;
                    context.didMeasureLayout = true;
                } catch { }
            }

            if (longPressGestureState.value !== handlerState) {
                longPressGestureState.value = handlerState

                runOnJS(handleActivate)()
            }
        },
        onFinish: (_, context) => {
            context.didMeasureLayout = false;
        },
    });
    //#endregion

    //#region styles
    const animatedContainerStyle = useAnimatedStyle(() => {
        const isAnimationActive = longPressGestureState.value === State.ACTIVE
        const animateOpacity = () => withDelay(isAnimationActive ? 0 : HOLD_ITEM_TRANSFORM_DURATION, withTiming(
            isAnimationActive ? 0 : 1,
            { duration: 0 }
        ))

        return {
            opacity: animateOpacity(),
        };
    });
    const containerStyle = useMemo(() => [animatedContainerStyle], [
        animatedContainerStyle
    ]);

    const animatedPortalItemContainerStyle = useAnimatedStyle(() => {
        const isAnimationActive = longPressGestureState.value === State.ACTIVE
        const DELAY_DURATION_FOR_SCALE = isAnimationActive ? HOLD_ITEM_TRANSFORM_DURATION / 2 : 10
        const DELAY_DURATION_FOR_OPACITY = isAnimationActive ? 0 : HOLD_ITEM_TRANSFORM_DURATION

        const animatedScale = () => isAnimationActive ? withSequence(
            withTiming(0.95, { duration: HOLD_ITEM_TRANSFORM_DURATION / 4 }),
            withTiming(1)) : withTiming(1);
        const animateTranslateY = (position: number) =>
            withDelay(DELAY_DURATION_FOR_SCALE, withTiming(position, {
                duration: HOLD_ITEM_TRANSFORM_DURATION,
            }))
        const animateOpacity = () =>
            withDelay(DELAY_DURATION_FOR_OPACITY, withTiming(
                isAnimationActive ? 1 : 0,
                { duration: 0 }
            ))

        return {
            zIndex: 10,
            position: "absolute",
            top: itemRectY.value,
            left: itemRectX.value,
            width: itemRectWidth.value,
            height: itemRectHeight.value,
            opacity: animateOpacity(),
            transform: [
                {
                    translateY: animateTranslateY(
                        longPressGestureState.value === State.ACTIVE ? -75 : 0,
                    ),
                },
                {
                    scale: animatedScale()
                }
            ],
        };
    });
    const portalItemContainerStyle = useMemo(() => [animatedPortalItemContainerStyle], [
        animatedPortalItemContainerStyle
    ]);
    //#endregion

    const animatedPopupProps = useAnimatedProps(() => ({
        pointerEvents:
            longPressGestureState.value === State.ACTIVE ? "auto" : "none",
    }));

    //#region effects
    React.useEffect(() => {
        if (state.active == CONTEXT_MENU_STATE.END)
            longPressGestureState.value = State.END
    }, [state])
    //#endregion

    return (
        <>
            <LongPressGestureHandler
                minDurationMs={300}
                onHandlerStateChange={longPressGestureEvent}
            >
                <Animated.View
                    onLayout={handleContainerLayout}
                    ref={containerRef}
                    style={containerStyle}
                >
                    {children}
                </Animated.View>
            </LongPressGestureHandler>

            <Portal>
                <Animated.View
                    pointerEvents="none"
                    key={`item-${id}`}
                    style={portalItemContainerStyle}
                    animatedProps={animatedPopupProps}
                >
                    {children}
                    <Menu items={items} itemHeight={itemRectHeight.value} longPressGestureState={longPressGestureState} />
                </Animated.View>
            </Portal>
        </>
    );
    //#endregion
};

const HoldItem = memo(HoldItemComponent);

export default HoldItem;
