import { memo } from 'react';

import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useInternal } from '../../hooks';

type IconComponentProps = {
  name: string;
  size: number;
  color?: string;
};

type IconProps = {
  iconComponent: any;
  name: string;
};

const Icon = ({ iconComponent, name }: IconProps) => {
  const { theme } = useInternal();
  const AnimatedIconComponent = Animated.createAnimatedComponent(
    iconComponent as any
  );

  const iconProps = useAnimatedProps(() => {
    return {
      color: theme.value === 'light' ? 'black' : 'white',
    };
  }, [theme]);

  return (
    <AnimatedIconComponent
      name={name}
      size={18}
      animatedProps={iconProps as Partial<IconComponentProps>}
    />
  );
};

export default memo(Icon);
