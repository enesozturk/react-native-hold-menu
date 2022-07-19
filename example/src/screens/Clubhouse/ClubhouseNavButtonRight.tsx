import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Feather as Icons } from '@expo/vector-icons';

const ClubhouseNavButtonRight = () => {
  return (
    <View style={styles.container}>
      <Icons name="at-sign" size={24} style={styles.atSign} />
      <Icons name="settings" size={24} />
    </View>
  );
};

export default memo(ClubhouseNavButtonRight);

const styles = StyleSheet.create({
  atSign: { marginRight: 32 },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
});
