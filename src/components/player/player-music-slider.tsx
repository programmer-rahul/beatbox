import { Text, View } from "react-native";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import useZustandStore from "@/store/zustand-store";

const PlayerMusicSlider = ({ duration }: { duration: number }) => {
  const { currentPosition } = useZustandStore();

  return (
    <View>
      <CustomRangeSlider totalMusicDuration={duration} />
      <View className="px-4 flex-row justify-between ">
        <Text className="text-xs text-neutral-500">
          {formatMusicFileDuration(currentPosition)}
        </Text>
        <Text className="text-xs text-neutral-500 text-right">
          {formatMusicFileDuration(duration)}
        </Text>
      </View>
    </View>
  );
};

export default PlayerMusicSlider;
