import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  View,
  Text,
  LayoutChangeEvent,
} from "react-native";

import StyleGuide from "../../utilities/styleGuide";

type CustomTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
  activeRoute: string;
  handleOpenMenu: (routeKey: string) => void;
  handleCloseMenu: () => void;
};

function NavButton({
  state,
  descriptors,
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
        onLayout={(layout: LayoutChangeEvent) => { }}
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
    </>
  );
}


export default NavButton