import { Text, View } from "react-native";
import PlayerScreenHeader from "./../components/player/player-screen-header";
import PlayerScreenView from "./../components/player/player-screen-view";
import COLORS from "../constants/colors";
import { Link, useIsFocused } from "@react-navigation/native";
import { Music } from "lucide-react-native";
import useZustandStore from "../store/useZustandStore";

const PlayerScreen = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  const isSwiping = useZustandStore((state) => state.isSwiping);
  const isFocused = useIsFocused();

  console.log("inside player screen");

  return (
    <View
      className="flex-1 space-y-10 px-4 transition-colors"
      style={{
        backgroundColor: isFocused
          ? isSwiping
            ? COLORS.primaryBg
            : COLORS.secondaryBg
          : COLORS.primaryBg,
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
  const isSwiping = useZustandStore((state) => state.isSwiping);

  console.log("INSIDE NO MUSIC_FILE_SELECTED");

  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-4">
        <Text
          className="text-center font-primary_regular text-3xl text-primaryBg"
          style={{
            color: isSwiping ? COLORS.primaryText : COLORS.primaryBg,
          }}
        >
          No Music File Selected Right Now
        </Text>
        <View
          className="rounded-md px-4 py-1 font-primary_semibold"
          style={{ backgroundColor: COLORS.main + "aa" }}
        >
          <Link to={"/home"}>
            <Text
              className="font-primary_semibold text-xl"
              style={{
                color: isSwiping ? COLORS.primaryText : COLORS.primaryBg,
              }}
            >
              Play Now
            </Text>
          </Link>
        </View>
      </View>
      <View className="absolute -z-10 opacity-10">
        <Music size={320} color={COLORS.main} />
      </View>
    </View>
  );
};
