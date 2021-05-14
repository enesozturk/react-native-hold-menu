import React, { memo } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import Icons from 'react-native-vector-icons/Feather';

import { HoldItem } from 'react-native-hold-menu';

const ClubhouseNavButtonLeft = ({ goBack }: { goBack: () => void }) => {
  return (
    <Pressable style={styles.container} onPress={goBack}>
      <HoldItem
        items={[
          { text: '@enesozt', onPress: () => {} },
          { text: 'All Rooms', onPress: () => {} },
        ]}
      >
        <Icons name="chevron-left" size={32} style={styles.icon} />
      </HoldItem>
    </Pressable>
  );
};

export default memo(ClubhouseNavButtonLeft);

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  icon: {},
});
