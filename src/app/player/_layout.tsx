import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const PlayerScreenLayout = () => {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="dark" backgroundColor="blue" />
    </View>
  );
};

export default PlayerScreenLayout;
