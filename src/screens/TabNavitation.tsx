import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";
import SavedScreen from "./SavedScreen";
import PlaylistScreen from "./PlaylistScreen";
import { Linking, StatusBar } from "react-native";
import { useEffect } from "react";
import COLORS from "../constants/colors";
import { Heart, House, ListMusic, Music } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootTabNavigationProp } from "../types/navigation-type";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useZustandStore from "../store/useZustandStore";

const Tab = createMaterialTopTabNavigator();

const TabNavitation = () => {
  const isSwiping = useZustandStore((state) => state.isSwiping);
  const setIsSwiping = useZustandStore((state) => state.setIsSwiping);

  const { navigate } = useNavigation<RootTabNavigationProp>();

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      if (event.url === "trackplayer://notification.click") {
        navigate("player");
      }
    };
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          display: "none",
        },

        tabBarActiveTintColor: COLORS.main,
        tabBarInactiveTintColor: COLORS.secondaryIcon,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <House color={color} />,
          tabBarStyle: {
            backgroundColor: COLORS.primaryBg,
          },
        }}
      />
      <Tab.Screen
        name="player"
        component={PlayerScreen}
        listeners={{
          focus: () => {
            setTimeout(() => {
              StatusBar.setBackgroundColor(COLORS.secondaryBg, true);
              StatusBar.setBarStyle("dark-content");
            }, 0);
          },
          blur: () => {
            StatusBar.setBackgroundColor(COLORS.primaryBg, false);
            StatusBar.setBarStyle("light-content");
          },
          swipeStart: () => {
            setTimeout(() => {
              StatusBar.setBackgroundColor(COLORS.primaryBg, false);
              StatusBar.setBarStyle("light-content");
            }, 0);
            setIsSwiping(true);
          },
          swipeEnd: () => {
            setTimeout(() => {
              StatusBar.setBackgroundColor(COLORS.secondaryBg, false);
              StatusBar.setBarStyle("dark-content");
            }, 0);
            setIsSwiping(false);
          },
        }}
        options={{
          tabBarIcon: ({ color }) => <Music color={color} />,
          tabBarStyle: {
            backgroundColor: isSwiping ? COLORS.primaryBg : COLORS.secondaryBg,
          },
        }}
      />
      <Tab.Screen
        name="saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color }) => <Heart color={color} />,
          tabBarStyle: {
            backgroundColor: COLORS.primaryBg,
          },
        }}
      />
      <Tab.Screen
        name="playlist"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({ color }) => <ListMusic color={color} />,
          tabBarStyle: {
            backgroundColor: COLORS.primaryBg,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavitation;
