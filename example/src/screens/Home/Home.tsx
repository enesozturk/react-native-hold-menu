import React, { useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

import List from './List';
import StyleGuide from '../../utilities/styleGuide';
import { useAppContext } from '../../hooks/useAppContext';

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const { theme } = useAppContext();

  useFocusEffect(() => {
    StatusBar.setHidden(false);
  });

  const navigation = useNavigation();

  const themeStyles = useMemo(() => {
    return {
      container: {
        flex: 1,
        backgroundColor: StyleGuide.palette[theme].backgroundColor,
      },
      title: {
        color: StyleGuide.palette[theme].color,
      },
    };
  }, [theme]);

  return (
    <View style={[themeStyles.container]}>
      <Text style={[themeStyles.title, styles.title]}>Examples</Text>
      <List onPress={(route: string) => navigation.navigate(route)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    marginTop: StyleGuide.spacing * 2,
    marginBottom: StyleGuide.spacing,
    paddingHorizontal: StyleGuide.spacing,
    ...StyleGuide.typography.title3,
  },
});
