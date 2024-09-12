import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// NativeWindStyleSheet.setOutput({
//   default: undefined,
// });

export default function RootLayout() {
  return (
    <View className="h-full border border-red-500">
      <SafeAreaView className="h-full">
        <RootNavigation />
        <StatusBar style="auto" backgroundColor="#99cdda" />
      </SafeAreaView>
    </View>
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
