import { View } from "react-native";
import Slider from "@react-native-community/slider";
import useZustandStore from "@/store/zustand-store";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const { musicTrack, currentPosition, setCurrentPosition } = useZustandStore();
  return (
    <View>
      <Slider
        minimumValue={1}
        maximumValue={Math.floor(totalMusicDuration)}
        onValueChange={(value) => {
          setCurrentPosition(value);
          try {
            musicTrack?.setPositionAsync(value * 1000);
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
