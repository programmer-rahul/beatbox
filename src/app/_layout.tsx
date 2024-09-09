import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  return (
    <SafeAreaView className="h-full">
    <>
      <RootNavigation />
      <StatusBar style="auto"/>
    </>
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
