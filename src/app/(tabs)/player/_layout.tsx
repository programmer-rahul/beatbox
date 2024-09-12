import { Stack } from "expo-router";
import { View } from "react-native";

const PlayerScreenLayout = () => {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
};

export default PlayerScreenLayout;
