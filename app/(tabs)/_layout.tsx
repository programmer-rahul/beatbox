import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Header from "@/components/header/header";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: true, header: () => <Header /> }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved/index"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
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
