import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import COLORS from "@/constants/colors";
import { useFonts } from "expo-font";
import { useEffect } from "react";

// NativeWindStyleSheet.setOutput({
//   default: undefined,
// });

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
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
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
