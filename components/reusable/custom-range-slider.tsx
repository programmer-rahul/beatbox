import { View } from "react-native";
import Slider from "@react-native-community/slider";
import useZustandStore from "@/store/zustand-store";
import { useCallback } from "react";
import { debounce } from "@/lib/helper";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const { musicTrack, currentPosition } = useZustandStore();

  // Debounced slider update
  const debouncedSliderPosition = useCallback(
    debounce((value: number) => {
      musicTrack?.setPositionAsync(value * 1000); // Set song position in milliseconds
    }, 300), // 300ms debounce delay
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
        thumbTintColor="#65a30d"
        minimumTrackTintColor="#65a30d"
      />
    </View>
  );
};

export default CustomRangeSlider;
