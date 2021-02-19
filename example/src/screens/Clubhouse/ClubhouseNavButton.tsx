import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icons from 'react-native-vector-icons/Feather';

import { HoldItem } from 'react-native-hold-menu';

const ClubhouseNavButton = () => {
  return (
    <View style={styles.container}>
      <HoldItem items={[{ title: 'Profile', onProfile: () => {} }]}>
        <Icons name="chevron-left" size={24} />
      </HoldItem>
    </View>
  );
};

export default ClubhouseNavButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
});
