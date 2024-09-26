import { Text, View } from "react-native";
import PlayerScreenHeader from "@/components/player/player-screen-header";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import PlayerScreenView from "@/components/player/player-screen-view";

const PlayerScreen = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  console.log("inside player screen");

  return (
    <View
      className="flex-1 space-y-10 bg-primaryBg px-4"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      {currentMusicTrack ? (
        <View className="flex-1">
          <PlayerScreenHeader />
          <PlayerScreenView />
        </View>
      ) : (
        <NoMusicFileSelected />
      )}
    </View>
  );
};

export default PlayerScreen;

const NoMusicFileSelected = () => {
  console.log("inside no music file selected");

  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-2">
        <Text className="text-center font-spacemono text-xl font-semibold">
          No Music File Selected Right Now
        </Text>
        <Link
          href="/(home)"
          className="rounded-md bg-main px-3 py-1 font-spacemono text-xl font-medium text-primaryBg/90"
          style={{
            color: COLORS.primaryBg,
            backgroundColor: COLORS.main,
          }}
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
