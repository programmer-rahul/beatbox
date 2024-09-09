import { Stack } from "expo-router";

const PlayerScreenLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default PlayerScreenLayout;
