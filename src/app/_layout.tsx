import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// NativeWindStyleSheet.setOutput({
//   default: undefined,
// });

export default function RootLayout() {
  return (
    <SafeAreaView className="h-full">
      <RootNavigation />
      <StatusBar style="auto" backgroundColor="blue" />
    </SafeAreaView>
  );
}

const RootNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="player" />
    </Stack>
  );
};
