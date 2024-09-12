import { Tabs } from "expo-router";
import Header from "@/components/header/header";
import { Ionicons, Octicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: true, header: () => <Header /> }}>
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={20}
              name={focused ? "settings-sharp" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
