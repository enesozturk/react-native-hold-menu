import React, { memo } from 'react';

import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useInternal } from '../../hooks';

type IconComponentProps = {
  name: string;
  size: number;
  animatedProps: Partial<{ color: string }>;
};

// Update iconComponent type, React.ComponentClass<IconComponentProps, any>
type IconProps = {
  iconComponent: any;
  name: string;
};

const Icon = ({ iconComponent, name }: IconProps) => {
  const { theme } = useInternal();
  let AnimatedIcon = Animated.createAnimatedComponent<IconComponentProps>(
    iconComponent
  );

  const iconProps = useAnimatedProps(() => {
    return {
      color: theme.value === 'light' ? 'black' : 'white',
    };
  }, [theme]);

  return <AnimatedIcon name={name} size={18} animatedProps={iconProps} />;
};

export default memo(Icon);
