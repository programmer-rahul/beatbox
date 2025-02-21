import { Stack } from "expo-router";

export default function PlaylistRoute() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Playlists" }} />
      <Stack.Screen
        name="selected-playlist"
        options={{ title: "Selected Playlist" }}
      />
    </Stack>
  );
}
