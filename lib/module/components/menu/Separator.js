import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useInternal } from '../../hooks';
import { BORDER_LIGHT_COLOR, BORDER_DARK_COLOR } from './constants';

const Separator = () => {
  const {
    theme
  } = useInternal();
  const separatorStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR
    };
  }, [theme]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.separator, { ...separatorStyles
    }]
  });
};

export default /*#__PURE__*/memo(Separator);
const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 8
  }
});
//# sourceMappingURL=Separator.js.map