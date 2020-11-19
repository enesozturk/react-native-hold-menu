import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import StyleGuide from "../components/StyleGuide";
import List from "./List";

interface HomeProps {
  navigation: any;
}

const Home = ({ navigation }: HomeProps) => {
  useFocusEffect(() => {
    StatusBar.setHidden(false);
  });

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
