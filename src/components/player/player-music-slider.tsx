import { Text, View } from "react-native";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import { useProgress } from "react-native-track-player";

const PlayerMusicSlider = ({ duration }: { duration: number }) => {
  const progress = useProgress();

  return (
    <View>
      <CustomRangeSlider totalMusicDuration={duration} />
      <View className="px-4 flex-row justify-between ">
        <Text className="text-xs text-secondaryText">
          {formatMusicFileDuration(progress.position)}
        </Text>
        <Text className="text-xs text-secondaryText text-right">
          {formatMusicFileDuration(duration)}
        </Text>
      </View>
    </View>
  );
};

export default PlayerMusicSlider;
