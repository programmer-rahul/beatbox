import { Text, View } from "react-native";
import PlayerScreenHeader from "@/components/player/player-screen-header";
import PlayerControls from "@/components/player/player-controls";
import PlayerAlbumDisplay from "@/components/player/player-album-display";
import PlayerMusicNameDisplay from "@/components/player/player-music-name-display";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

const PlayerScreen = () => {
  const { currentMusicTrack } = useTrackStore();

  return (
    <View className="flex-1 space-y-10 bg-primaryBg px-4">
      {currentMusicTrack ? (
        <View className="flex-1">
          <PlayerScreenHeader />
          <View className="flex-1">
            <View
              className="flex h-3/4 flex-col justify-center"
              style={{ rowGap: 20 }}
            >
              <PlayerAlbumDisplay />
              <PlayerMusicNameDisplay />
            </View>
            <View>
              <PlayerControls />
            </View>
          </View>
        </View>
      ) : (
        <NoMusicFileSelected />
      )}
    </View>
  );
};

export default PlayerScreen;

const NoMusicFileSelected = () => {
  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-2">
        <Text className="text-center font-spacemono text-xl font-semibold">
          No Music File Selected Right Now
        </Text>
        <Link
          href="/(home)"
          className="rounded-md bg-main px-3 py-1 font-spacemono text-xl font-medium text-primaryBg/90"
        >
          Play Now
        </Link>
      </View>
      <View className="absolute -z-10 opacity-10">
        <Feather name="music" size={350} color={COLORS.main} />
      </View>
    </View>
  );
};
