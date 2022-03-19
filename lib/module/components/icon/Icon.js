import React, { memo } from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useInternal } from '../../hooks';

const Icon = ({
  iconComponent,
  name
}) => {
  const {
    theme
  } = useInternal();
  let AnimatedIcon = Animated.createAnimatedComponent(iconComponent);
  const iconProps = useAnimatedProps(() => {
    return {
      color: theme.value === 'light' ? 'black' : 'white'
    };
  }, [theme]);
  return /*#__PURE__*/React.createElement(AnimatedIcon, {
    name: name,
    size: 18,
    animatedProps: iconProps
  });
};

export default /*#__PURE__*/memo(Icon);
//# sourceMappingURL=Icon.js.map