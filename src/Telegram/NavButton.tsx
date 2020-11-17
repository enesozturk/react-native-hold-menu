import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ItemToHold, MenuBackDrop } from "../../react-native-hold-menu";

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
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: StyleGuide.spacing * 3,
          paddingTop: StyleGuide.spacing,
          zIndex: 16,
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
            <ItemToHold
              id={0}
              key={index}
              onOpenMenu={() => handleOpenMenu(route.key)}
              onCloseMenu={() => {
                onPress();
                handleCloseMenu();
              }}
              isSelected={activeRoute == route.key}
              containerStyle={styles.container}
              menuProps={{
                anchorPoint:
                  index == 0 || index == 1
                    ? "bottom-left"
                    : index == state.routes.length - 1
                    ? "bottom-right"
                    : "bottom-center",
              }}
              wrapperStyle={[
                {
                  display: "flex",
                  alignItems: "center",
                },
              ]}
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
            </ItemToHold>
          );
        })}
      </View>

      <MenuBackDrop
        containerStyle={{ position: "absolute" }}
        onCloseMenu={handleCloseMenu}
        toggle={activeRoute !== ""}
        tint="light"
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
