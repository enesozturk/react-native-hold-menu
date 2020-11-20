import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import StyleGuide from "../components/StyleGuide";
import List from "./List";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  useFocusEffect(() => {
    StatusBar.setHidden(false);
  });

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, zIndex: 6 }}>
      <Text style={styles.title}>Examples</Text>
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
