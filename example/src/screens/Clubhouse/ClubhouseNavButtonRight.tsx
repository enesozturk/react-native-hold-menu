import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import Icons from 'react-native-vector-icons/Feather';

const ClubhouseNavButtonRight = () => {
  return (
    <View style={styles.container}>
      <Icons name="at-sign" size={24} style={{ marginRight: 32 }} />
      <Icons name="settings" size={24} />
    </View>
  );
};

export default memo(ClubhouseNavButtonRight);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
});
