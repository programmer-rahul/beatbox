import { View } from "react-native";
import Slider from "@react-native-community/slider";
import useZustandStore from "@/store/zustand-store";
import { useCallback } from "react";
import { debounce } from "@/lib/helper";
import COLORS from "@/constants/colors";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const { musicTrack, currentPosition } = useZustandStore();

  // Debounced slider update
  const debouncedSliderPosition = useCallback(
    debounce((value: number) => {
      musicTrack?.setPositionAsync(value * 1000);
    }, 300),
    [musicTrack]
  );

  return (
    <View>
      <Slider
        minimumValue={1}
        maximumValue={Math.floor(totalMusicDuration)}
        onValueChange={(value) => {
          try {
            debouncedSliderPosition(value);
          } catch (error) {
            console.log("error in changing seeking music", error);
          }
        }}
        value={currentPosition}
        thumbTintColor={COLORS.main}
        minimumTrackTintColor={COLORS.main}
        maximumTrackTintColor={COLORS.secondaryIcon}
      />
    </View>
  );
};

export default CustomRangeSlider;
