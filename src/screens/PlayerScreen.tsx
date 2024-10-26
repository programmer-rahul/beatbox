import { Text, View } from "react-native";
import PlayerScreenHeader from "./../components/player/player-screen-header";
import PlayerScreenView from "./../components/player/player-screen-view";
import COLORS from "../constants/colors";
import { Link } from "@react-navigation/native";
import { Music } from "lucide-react-native";
import useZustandStore from "../store/useZustandStore";
import ShowBlurredImageBg from "../components/reusable/show-blurred-image-bg";

const PlayerScreen = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  console.log("inside player screen");

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View className="z-10 flex-1 transition-colors">
        {currentMusicTrack ? (
          <View className="flex-1 pb-20">
            <PlayerScreenHeader />
            <PlayerScreenView />
          </View>
        ) : (
          <NoMusicFileSelected />
        )}
      </View>

      <ShowBlurredImageBg />
    </View>
  );
};

export default PlayerScreen;

const NoMusicFileSelected = () => {
  console.log("INSIDE NO MUSIC_FILE_SELECTED");

  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-4">
        <Text
          className="text-center font-primary_regular text-3xl text-primaryText"
          style={{
            color: COLORS.primaryText,
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
                color: COLORS.primaryText + "aa",
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
