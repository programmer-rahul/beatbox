import { Text, View } from "react-native";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import trackStore from "@/store/track-store";
import { useProgress } from "react-native-track-player";

const PlayerMusicSlider = () => {
  const progress = useProgress();
  const { currentMusicTrack } = trackStore();

  return currentMusicTrack ? (
    <View>
      <CustomRangeSlider totalMusicDuration={currentMusicTrack?.duration} />
      <View className="px-4 flex-row justify-between ">
        <Text className="text-xs text-secondaryText">
          {formatMusicFileDuration(progress.position, "seconds")}
        </Text>
        <Text className="text-xs text-secondaryText text-right">
          {formatMusicFileDuration(currentMusicTrack.duration, "milliseconds")}
        </Text>
      </View>
    </View>
  ) : null;
};

export default PlayerMusicSlider;
