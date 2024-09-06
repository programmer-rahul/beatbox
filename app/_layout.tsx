import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import {} from "expo-font";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="player/index" />
    </Stack>
  );
}
