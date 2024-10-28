import { Text, View } from "react-native";
import PlayerScreenHeader from "./../components/player/player-screen-header";
import COLORS from "../constants/colors";
import { Link } from "@react-navigation/native";
import { Music } from "lucide-react-native";
import useZustandStore from "../store/useZustandStore";
import ShowBlurredImageBg from "../components/reusable/show-blurred-image-bg";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ScanningMusicFiles from "../components/reusable/scanning-music-files";
import PlayerScreenView from "./../components/player/player-screen-view";

const PlayerScreen = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const allLocalMusicTracks = useZustandStore(
    (state) => state.allLocalMusicTracks,
  );

  // console.log("inside player screen");

  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View
        className="z-10 flex-1 transition-colors"
        style={{ paddingTop: insets.top }}
      >
        {currentMusicTrack ? (
          <View className="flex-1 pb-20">
            <PlayerScreenHeader />
            <PlayerScreenView />
          </View>
        ) : allLocalMusicTracks.length > 0 ? (
          <NoMusicFileSelected />
        ) : (
          <ScanningMusicFiles />
        )}
      </View>

      <View
        className="absolute h-full w-full"
        style={{
          height: frame.height,
        }}
      >
        <ShowBlurredImageBg />
      </View>
    </View>
  );
};

export default PlayerScreen;

const NoMusicFileSelected = () => {
  // console.log("INSIDE NO MUSIC_FILE_SELECTED");

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
