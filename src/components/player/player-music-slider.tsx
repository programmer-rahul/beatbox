import { Text, View } from "react-native";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import useTrackStore from "@/store/track-store";
import { useProgress } from "react-native-track-player";
import COLORS from "@/constants/colors";

const PlayerMusicSlider = () => {
  const progress = useProgress();
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  console.log("INSIDE MUSIC_PLAYER_SLIDER");

  return currentMusicTrack ? (
    <View>
      <CustomRangeSlider totalMusicDuration={currentMusicTrack?.duration} />
      <View className="flex-row justify-between px-4">
        <Text
          className="font-primary_semibold text-xs text-secondaryText"
          style={{
            color: COLORS.secondaryText,
          }}
        >
          {formatMusicFileDuration(progress.position, "seconds")}
        </Text>
        <Text
          className="text-right font-primary_semibold text-xs text-secondaryText"
          style={{
            color: COLORS.secondaryText,
          }}
        >
          {formatMusicFileDuration(currentMusicTrack.duration, "milliseconds")}
        </Text>
      </View>
    </View>
  ) : null;
};

export default PlayerMusicSlider;
