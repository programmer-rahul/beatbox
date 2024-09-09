import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Header from "@/components/header/header";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: true, header: () => <Header /> }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
