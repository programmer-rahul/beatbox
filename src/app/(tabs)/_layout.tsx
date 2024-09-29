import { Tabs, usePathname } from "expo-router";
import Header from "@/components/header/header";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const TabLayout = () => {
  const currentTab = usePathname();

  useEffect(() => {
    if (currentTab === "/player") {
      StatusBar.setBackgroundColor(COLORS.secondaryBg, false);
      StatusBar.setBarStyle("dark-content");
    } else {
      StatusBar.setBackgroundColor(COLORS.primaryBg, false);
      StatusBar.setBarStyle("light-content");
    }
  }, [currentTab]);

  console.log("currentTab", currentTab);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <Header />,
        title: "yes",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            currentTab === "/player" ? COLORS.secondaryBg : COLORS.primaryBg,

          borderColor:
            currentTab === "/player"
              ? COLORS.secondaryIcon
              : COLORS.secondaryBg,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },

        tabBarActiveTintColor: COLORS.main,
        tabBarInactiveTintColor: COLORS.secondaryIcon,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          title: "Player",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              size={25}
              name={focused ? "play" : "playcircleo"}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              size={25}
              name={focused ? "heart-fill" : "heart"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "playlist-music" : "playlist-music-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
