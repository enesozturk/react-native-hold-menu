import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import { MenuBackDrop } from "../../react-native-hold-menu";

import StyleGuide from "../components/StyleGuide";

type CustomTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
  activeRoute: string;
  handleOpenMenu: (routeKey: string) => void;
  handleCloseMenu: () => void;
};

export function NavButton({
  state,
  descriptors,
  navigation,
  activeRoute,
  handleOpenMenu,
  handleCloseMenu,
}: CustomTabBarProps) {
  const [scrollY, setScrollY] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: StyleGuide.spacing * 3,
          paddingTop: StyleGuide.spacing,
          zIndex: 16,
        }}
        onLayout={(layout: LayoutChangeEvent) => {
          setContainerHeight(layout.nativeEvent.layout.height);
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
            <>
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
            </>
          );
        })}
      </View>

      <MenuBackDrop
        containerStyle={{ position: "absolute" }}
        onCloseMenu={handleCloseMenu}
        toggle={activeRoute !== ""}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 6,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
