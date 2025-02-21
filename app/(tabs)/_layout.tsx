import Header from "@/components/header/Header";
import { COLORS } from "@/constants/COLORS";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT } from "@/constants/DIMENSIONS";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const TabsScreenOptions: BottomTabNavigationOptions = {
  header: () => <Header />,
  tabBarActiveTintColor: COLORS.MAIN,
  tabBarInactiveTintColor: COLORS.SECONDARY_TEXT,
  tabBarStyle: {
    backgroundColor: COLORS.NAVIGATION_BG,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: "transparent",
    borderTopWidth: 0,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT,
  },
};

export default function TabLayout() {
  return (
    <Tabs initialRouteName="playlists" screenOptions={TabsScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
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
            <Ionicons
              name={focused ? "musical-notes-sharp" : "musical-notes-outline"}
              size={24}
              color={color}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.NAVIGATION_BG,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderColor: "transparent",
            borderTopWidth: 0,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: TAB_BAR_HEIGHT,
            elevation: 0,
          },
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              size={24}
              name={focused ? "heart" : "hearto"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: "Playlists",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={30}
              name={"playlist-play"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
