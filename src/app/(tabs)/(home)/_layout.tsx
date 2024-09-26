import COLORS from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const HomeScreenLayout = () => {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar
        style="light"
        backgroundColor={COLORS.primaryBg}
        animated={true}
      />
    </View>
  );
};

export default HomeScreenLayout;
