import { Text, View } from "react-native";
import useTrackStore, { trackStore } from "./../../store/track-store";
import COLORS from "./../../constants/colors";
import MusicFileTitle from "../reusable/music-file-title";

const PlayerMusicNameDisplay = () => {
  const currentMusicTrack = trackStore((state) => state.currentMusicTrack);

  return (
    <View className="flex justify-between px-2">
      <MusicFileTitle text="big" />
      <Text
        className="font-primary_regular text-center text-sm text-secondaryText"
        numberOfLines={1}
        style={{
          color: COLORS.secondaryText,
        }}
      >
        {currentMusicTrack?.album}
      </Text>
    </View>
  );
};

export default PlayerMusicNameDisplay;
