import { View } from "react-native";
import Slider from "@react-native-community/slider";
import COLORS from "@/constants/colors";
import useTrack from "@/hooks/useTrack";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const { progress, TrackPlayer } = useTrack();

  return (
    <View>
      <Slider
        minimumValue={1}
        maximumValue={Math.floor(totalMusicDuration)}
        onValueChange={async (value) => {
          try {
            await TrackPlayer.seekTo(value);
          } catch (error) {
            console.log("error in changing seeking music", error);
          }
        }}
        value={progress.position}
        thumbTintColor={COLORS.main}
        minimumTrackTintColor={COLORS.main}
        maximumTrackTintColor={COLORS.secondaryIcon}
      />
    </View>
  );
};

export default CustomRangeSlider;
