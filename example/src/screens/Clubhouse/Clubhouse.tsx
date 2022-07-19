import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyleGuide from '../../utilities/styleGuide';

const Clubhouse = () => {
  return <View style={styles.container} />;
};

export default Clubhouse;

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.clubhouse.background,
    flex: 1,
  },
});
