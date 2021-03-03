import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import Icons from 'react-native-vector-icons/Feather';

import { HoldItem } from 'react-native-hold-menu';

const ClubhouseNavButtonLeft = () => {
  return (
    <View style={styles.container}>
      <HoldItem
        items={[
          { text: '@enesozt', onPress: () => {} },
          { text: 'All Rooms', onPress: () => {} },
        ]}
      >
        <Icons name="chevron-left" size={32} style={styles.icon} />
      </HoldItem>
    </View>
  );
};

export default memo(ClubhouseNavButtonLeft);

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  icon: {},
});
