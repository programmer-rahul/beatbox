import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";
import SavedScreen from "./SavedScreen";
import PlaylistScreen from "./PlaylistScreen";
import { Linking, View } from "react-native";
import { useEffect } from "react";
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

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      style={{ marginBottom: insets.bottom, marginTop: insets.top }}
      tabBarPosition="bottom"
      tabBar={(props) => {
        return (
          <View className="absolute bottom-0 left-0 right-0">
            <MaterialTopTabBar {...props} key={props.state.key} />
          </View>
        );
      }}
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.main,
        tabBarInactiveTintColor: COLORS.secondaryIcon,
        tabBarPressColor: "transparent",
        tabBarIndicatorStyle: {
          display: "none",
        },
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <House color={color} />,
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
          tabBarIcon: ({ color }) => <Music color={color} />,
        }}
      />
      <Tab.Screen
        name="saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color }) => <Heart color={color} />,
        }}
      />
      <Tab.Screen
        name="playlist"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({ color }) => <ListMusic color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavitation;
