import isEqual from 'lodash.isequal';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { BORDER_LIGHT_COLOR, BORDER_DARK_COLOR } from './constants';

type SeparatorProps = {
  theme: 'light' | 'dark';
};

const Separator = ({ theme }: SeparatorProps) => {
  const styles = useMemo(() => {
    return {
      width: '100%',
      height: 8,
      backgroundColor:
        theme === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR,
    };
  }, [theme]);

  return <View style={styles} />;
};

export default memo(Separator, isEqual);
