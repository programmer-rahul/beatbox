import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import playbackService from "@/lib/playback-service";
import TrackPlayer from "react-native-track-player";
import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import usePermission from "@/hooks/usePermission";
import PermissionRequired from "@/components/reusable/permission-required";
import usePlayerEvents from "@/hooks/usePlayerEvents";
import { StatusBar } from "react-native";
import COLORS from "@/constants/colors";

TrackPlayer.registerPlaybackService(() => playbackService);
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isTrackPlayerInitialized = useRef(false);
  const [loaded, error] = useFonts({
    Primary_Light: require("@/assets/fonts/IBMPlexSans-Light.ttf"),
    Primary_Regular: require("@/assets/fonts/IBMPlexSans-Regular.ttf"),
    Primary_SemiBold: require("@/assets/fonts/IBMPlexSans-SemiBold.ttf"),
    Primary_Bold: require("@/assets/fonts/IBMPlexSans-Bold.ttf"),
  });

  useSetupTrackPlayer({ isTrackPlayerInitialized });

  useEffect(() => {
    if ((loaded && isTrackPlayerInitialized) || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <RootNavigation />
        <StatusBar
          backgroundColor={COLORS.primaryBg}
          barStyle={"light-content"}
        />
      </SafeAreaView>
    </>
  );
}

const RootNavigation = () => {
  const { isHavePermission } = usePermission();

  // mount player events
  usePlayerEvents();

  console.log("here at rootNavigation");

  return isHavePermission ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  ) : (
    <PermissionRequired />
  );
};
