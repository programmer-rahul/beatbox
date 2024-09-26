import { Text, View } from "react-native";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import useTrackStore from "@/store/track-store";
import { useProgress } from "react-native-track-player";

const PlayerMusicSlider = () => {
  const progress = useProgress();
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  return currentMusicTrack ? (
    <View>
      <CustomRangeSlider totalMusicDuration={currentMusicTrack?.duration} />
      <View className="flex-row justify-between px-4">
        <Text className="text-xs text-secondaryText">
          {formatMusicFileDuration(progress.position, "seconds")}
        </Text>
        <Text className="text-right text-xs text-secondaryText">
          {formatMusicFileDuration(currentMusicTrack.duration, "milliseconds")}
        </Text>
      </View>
    </View>
  ) : null;
};

export default PlayerMusicSlider;
