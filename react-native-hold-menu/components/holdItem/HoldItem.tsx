import React, { memo, useCallback, useMemo, useState } from "react";
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

// Utils
import { CONTEXT_MENU_STATE } from "../../constants";
import { useLayout } from "../../hooks/useLayout";
import type { HoldItemProps } from "./types";
import { HoldMenuContext } from "../provider/Provider";

const HoldItemComponent = ({
    id, children,
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
    const ANIMATION_DURATION = 75

    const animatedContainerStyle = useAnimatedStyle(() => {
        const isAnimationActive = longPressGestureState.value === State.ACTIVE
        const animateOpacity = () => withDelay(isAnimationActive ? 0 : ANIMATION_DURATION, withTiming(
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

        const animatedScale = () => isAnimationActive ? withSequence(withTiming(0.95, { duration: ANIMATION_DURATION }), withTiming(1)) : 1;
        const animateTranslateY = (position: number) =>
            withDelay(isAnimationActive ? ANIMATION_DURATION : 0, withTiming(position, {
                duration: ANIMATION_DURATION,
            }));
        const animateOpacity = () =>
            withDelay(isAnimationActive ? 0 : ANIMATION_DURATION, withTiming(
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
                </Animated.View>
            </Portal>
        </>
    );
    //#endregion
};

const HoldItem = memo(HoldItemComponent);

export default HoldItem;
