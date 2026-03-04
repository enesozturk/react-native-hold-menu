import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

function logWorkletError(label: string, message: string) {
  console.error('[react-native-hold-menu]', label, message);
}

// Components
import { BlurView } from 'expo-blur';

// Utils
import {
    CONTEXT_MENU_STATE,
    HOLD_ITEM_TRANSFORM_DURATION,
    IS_IOS,
    WINDOW_HEIGHT,
} from '../../constants';
import { useInternal } from '../../hooks';
import {
    BACKDROP_DARK_BACKGROUND_COLOR,
    BACKDROP_LIGHT_BACKGROUND_COLOR,
} from './constants';
import { styles } from './styles';

const AnimatedBlurView = IS_IOS
  ? (Animated.createAnimatedComponent(BlurView) as any)
  : Animated.View;

const BackdropComponent = () => {
  const { state, theme } = useInternal();

  const animatedContainerStyle = useAnimatedStyle(() => {
    try {
      return {
        top: state.value === CONTEXT_MENU_STATE.ACTIVE
          ? 0
          : withDelay(
              HOLD_ITEM_TRANSFORM_DURATION,
              withTiming(WINDOW_HEIGHT, {
                duration: 0,
              })
            ),
        opacity: withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
          duration: HOLD_ITEM_TRANSFORM_DURATION,
        }),
      };
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'Backdrop.animatedContainerStyle',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      throw e;
    }
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    try {
      const backgroundColor =
        theme.value === 'light'
          ? BACKDROP_LIGHT_BACKGROUND_COLOR
          : BACKDROP_DARK_BACKGROUND_COLOR;

      return { backgroundColor };
    } catch (e) {
      scheduleOnRN(
        logWorkletError,
        'Backdrop.animatedInnerContainerStyle',
        (e != null && typeof (e as Error).message === 'string')
          ? (e as Error).message
          : String(e)
      );
      throw e;
    }
  }, [theme]);

  return (
    <AnimatedBlurView
      {...(IS_IOS
        ? {
            tint: 'default',
            intensity: 100,
          }
        : {})}
      pointerEvents="none"
      style={[styles.container, animatedContainerStyle]}
    >
      <Animated.View
        style={[
          { ...StyleSheet.absoluteFillObject },
          animatedInnerContainerStyle,
        ]}
      />
    </AnimatedBlurView>
  );
};

const Backdrop = memo(BackdropComponent);

export default Backdrop;
