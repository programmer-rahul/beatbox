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

TrackPlayer.registerPlaybackService(() => playbackService);
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isTrackPlayerInitialized = useRef(false);

  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
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
