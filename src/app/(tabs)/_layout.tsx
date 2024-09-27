import { Tabs } from "expo-router";
import Header from "@/components/header/header";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: COLORS.primaryBg,
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
              size={20}
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
              size={20}
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
              size={20}
              name={focused ? "heart-fill" : "heart"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
