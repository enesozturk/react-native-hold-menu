import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useInternal } from '../../hooks';

import { BORDER_LIGHT_COLOR, BORDER_DARK_COLOR } from './constants';

const Seperator = () => {
  const { theme } = useInternal();

  const seperatorStyles = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR,
    };
  }, [theme]);

  return <Animated.View style={[styles.seperator, { ...seperatorStyles }]} />;
};

export default memo(Seperator);

const styles = StyleSheet.create({
  seperator: {
    width: '100%',
    height: 8,
  },
});
