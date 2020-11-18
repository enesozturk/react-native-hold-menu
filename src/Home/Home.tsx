import React from "react";
import { StyleSheet, View, Text } from "react-native";
import StyleGuide from "../components/StyleGuide";
import List from "./List";

interface HomeProps {
  navigation: any;
}

const Home = ({ navigation }: HomeProps) => {
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
