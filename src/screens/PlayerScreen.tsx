import { Text, View } from "react-native";
import { memo } from "react";
import PlayerScreenHeader from "./../components/player/player-screen-header";
import PlayerScreenView from "./../components/player/player-screen-view";
import COLORS from "../constants/colors";
import { Link, useNavigation } from "@react-navigation/native";
import { Music } from "lucide-react-native";
import useZustandStore from "../store/useZustandStore";

const PlayerScreen = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  console.log("inside player screen");

  return (
    <View
      className="flex-1 space-y-10 bg-primaryBg px-4"
      style={{
        backgroundColor: COLORS.secondaryBg,
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

export default memo(PlayerScreen);

const NoMusicFileSelected = () => {
  console.log("INSIDE NO MUSIC_FILE_SELECTED");

  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-4">
        <Text className="font-primary_regular text-center text-3xl text-primaryBg">
          No Music File Selected Right Now
        </Text>
        <Link to={"/home"}>
          <Text
            className="font-primary_semibold px-4 text-xl"
            style={{
              color: COLORS.primaryBg,
              backgroundColor: COLORS.main + "aa",
            }}
          >
            Play Now
          </Text>
        </Link>
      </View>
      <View className="absolute -z-10 opacity-10">
        <Music size={320} color={COLORS.main} />
      </View>
    </View>
  );
};
