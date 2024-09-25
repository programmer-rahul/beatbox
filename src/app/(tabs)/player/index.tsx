import { Text, View } from "react-native";
import PlayerScreenHeader from "@/components/player/player-screen-header";
import PlayerControls from "@/components/player/player-controls";
import PlayerAlbumDisplay from "@/components/player/player-album-display";
import PlayerMusicNameDisplay from "@/components/player/player-music-name-display";
import COLORS from "@/constants/colors";
import trackStore from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

const PlayerScreen = () => {
  const { currentMusicTrack } = trackStore();

  return (
    <View className="px-4 space-y-10 flex-1 bg-primaryBg">
      {currentMusicTrack ? (
        <View className="flex-1 space-y-16">
          <PlayerScreenHeader />
          <View className="space-y-16">
            <View className="mt-16">
              <PlayerAlbumDisplay />
            </View>
            <View>
              <PlayerMusicNameDisplay />
            </View>
          </View>
          <View>
            <PlayerControls />
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
    <View className="flex items-center justify-center flex-1 relative">
      <View className="flex items-center justify-center gap-2">
        <Text className="text-xl text-center font-semibold font-spacemono">
          No Music File Selected Right Now
        </Text>
        <Link
          href="/(home)"
          className="text-xl rounded-md px-3 py-1 bg-main text-primaryBg/90 font-spacemono font-medium"
        >
          Play Now
        </Link>
      </View>
      <View className="absolute -z-10 opacity-10 right-4">
        <Feather name="music" size={400} color={COLORS.main} />
      </View>
    </View>
  );
};
