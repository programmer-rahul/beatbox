import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const PlayerScreenLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="dark" backgroundColor="#aacd88" />
    </>
  );
};

export default PlayerScreenLayout;
