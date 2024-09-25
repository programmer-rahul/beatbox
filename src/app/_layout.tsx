import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import COLORS from "@/constants/colors";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import playbackService from "@/lib/playback-service";
import TrackPlayer from "react-native-track-player";
import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import usePermission from "@/hooks/usePermission";
import PermissionRequired from "@/components/reusable/permission-required";
import Header from "@/components/header/header";

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
      <StatusBar style="dark" backgroundColor={COLORS.primaryBg} />
    </>
  );
}

const RootNavigation = () => {
  const { isHavePermission } = usePermission();

  return isHavePermission ? (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  ) : (
    <PermissionRequired />
  );
};
