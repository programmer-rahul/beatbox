import "../global.css";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import PermissionsRequired from "@/components/PermissionsRequired";
import InitialMusicFilesScanning from "@/components/InitialMusicFilesScanning";
import useMusicStore from "@/store/useMusicStore";
import CustomView from "@/components/reusable/CustomView";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { StatusBar } from "react-native";
import { COLORS } from "@/constants/COLORS";
import TrackPlayer from "react-native-track-player";
import { playbackService, setupTrackPlayer } from "@/libs/playbackService";
import NoMusicFilesFound from "@/components/NoMusicFilesFound";
import NavigationBar from "react-native-navigation-bar-color";
import { AlertContainer } from "rn-custom-alert-prompt";
import { MenuProvider } from "react-native-popup-menu";
import CustomBottomSheet from "@/components/reusable/CustomBottomSheet";
import { useMusicFilesScanning } from "@/hooks/useMusicFilesScanning";
import useMediaPermissions from "@/hooks/useMediaPermissions";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Register the playback service and setup the track player
TrackPlayer.registerPlaybackService(() => playbackService);
setupTrackPlayer();

export default function RootLayout() {
  // Load custom fonts
  const [isFontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // Set the navigation bar color
  NavigationBar(COLORS.NAVIGATION_BG);

  return (
    <>
      {/* Render RootNavigation only if fonts are loaded */}
      {isFontsLoaded && <RootNavigation />}
      <StatusBar
        backgroundColor={COLORS.NAVIGATION_BG}
        barStyle={"light-content"}
      />
    </>
  );
}

function RootNavigation() {
  const hasHydrated = useMusicStore((state) => state.hasHydrated);
  const { mediaPermissions, isPermissionsChecking, setMediaPermissions } =
    useMediaPermissions();

  useEffect(() => {
    // Hide splash screen once the store has hydrated and permissions are checked
    if (hasHydrated && !isPermissionsChecking) {
      SplashScreen.hideAsync();
    }
  }, [hasHydrated, isPermissionsChecking]);

  // Return null if the store has not hydrated or permissions are still being checked
  if (!hasHydrated || isPermissionsChecking) return null;

  return (
    <CustomView className="flex-1" backgroundColor="NAVIGATION_BG">
      {/* Render TabNavigation if media permissions are granted, otherwise render PermissionsRequired */}
      {mediaPermissions ? (
        <TabNavigation />
      ) : (
        <PermissionsRequired setMediaPermissions={setMediaPermissions} />
      )}
    </CustomView>
  );
}

function TabNavigation() {
  const { localMusicFilesCount, isScanning } = useMusicFilesScanning();

  // Show InitialMusicFilesScanning component if scanning is in progress
  if (localMusicFilesCount === null && isScanning) {
    return <InitialMusicFilesScanning />;
  }

  // Show NoMusicFilesFound component if no music files are found
  if (localMusicFilesCount === 0) {
    return <NoMusicFilesFound />;
  }

  return (
    <>
      <MenuProvider>
        {/* Define the stack  navigator */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <CustomBottomSheet />
      </MenuProvider>
      {/* Alert container */}
      <AlertContainer
        animationType="slide"
        appearance="dark"
        personalTheme={{
          lineColor: COLORS.MAIN,
          inputColor: COLORS.MAIN,
          textButtonColor: COLORS.MAIN,
          inputBorderColor: COLORS.MAIN,
          descriptionColor: COLORS.PRIMARY_TEXT + "bb",
        }}
      />
    </>
  );
}
