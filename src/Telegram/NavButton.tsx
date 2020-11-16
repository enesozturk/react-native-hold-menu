import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import StyleGuide from "../components/StyleGuide";

type CustomTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export function CustomNavButton({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: StyleGuide.spacing * 3,
        paddingTop: StyleGuide.spacing,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const TabBarIcon =
          options.tabBarIcon !== undefined ? options.tabBarIcon : null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
          >
            {TabBarIcon && (
              <TabBarIcon color={isFocused ? "#007AFF" : "gray"} />
            )}
            <Text
              style={{
                color: isFocused ? "#007AFF" : "gray",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
