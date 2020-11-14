import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

type NavButtonProps = {
  active: boolean;
  title: string;
  icon: string;
};

export const NavButton = ({ active, title, icon }: NavButtonProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Feather size={24} name={icon} color={!active ? "gray" : "blue"} />
      <Text style={{ color: !active ? "gray" : "blue" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
