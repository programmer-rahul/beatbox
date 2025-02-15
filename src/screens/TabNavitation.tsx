import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";
import SavedScreen from "./SavedScreen";
import PlaylistScreen from "./PlaylistScreen";
import { Linking, View } from "react-native";
import { memo, useEffect } from "react";
import COLORS from "../constants/colors";
import { Heart, House, ListMusic, Music } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootTabNavigationProp } from "../types/navigation-type";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import useZustandStore from "../store/useZustandStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const TabNavitation = () => {
  const setIsSwiping = useZustandStore((state) => state.setIsSwiping);
  const { navigate } = useNavigation<RootTabNavigationProp>();
  const insets = useSafeAreaInsets();

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
      style={{ marginBottom: insets.bottom + 20 }}
      tabBarPosition="bottom"
      tabBar={(props) => {
        return (
          <View className="absolute bottom-0 left-0 right-0">
            <MaterialTopTabBar {...props} />
          </View>
        );
      }}
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.main,
        tabBarInactiveTintColor: COLORS.primaryText,
        tabBarPressColor: "transparent",
        tabBarIndicatorStyle: {
          display: "none",
        },
        tabBarStyle: {
          backgroundColor: COLORS.navigationBg,
          elevation: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          // paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={24} />,
        }}
      />

      <Tab.Screen
        name="player"
        component={PlayerScreen}
        listeners={{
          swipeStart: () => {
            setIsSwiping(true);
          },
          swipeEnd: () => {
            setIsSwiping(false);
          },
        }}
        options={{
          tabBarIcon: ({ color }) => <Music color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="playlist"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({ color }) => <ListMusic color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default memo(TabNavitation);
