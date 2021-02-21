import React, { memo } from 'react';
import { Pressable } from 'react-native';

import Icons from 'react-native-vector-icons/Feather';
import StyleGuide from '../../utilities/styleGuide';
import { useAppContext } from '../../hooks/useAppContext';

const ToggleThemeButton = ({ theme }: { theme: 'light' | 'dark' }) => {
  const { toggleTheme } = useAppContext();

  return (
    <Pressable
      onPress={toggleTheme}
      style={{ marginRight: StyleGuide.spacing * 2 }}
    >
      <Icons
        name={theme === 'light' ? 'sun' : 'moon'}
        size={24}
        color={StyleGuide.palette[theme].color}
      />
    </Pressable>
  );
};

export default memo(ToggleThemeButton);
