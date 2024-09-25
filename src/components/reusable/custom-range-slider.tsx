import { View } from "react-native";
import Slider from "@react-native-community/slider";
import COLORS from "@/constants/colors";
import useTrack from "@/hooks/useTrack";
import trackStore from "@/store/track-store";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const { progress, TrackPlayer } = useTrack();
  const { currentMusicTrack } = trackStore();

  return (
    <View>
      <Slider
        minimumValue={1}
        maximumValue={Math.floor(totalMusicDuration / 1000)}
        onValueChange={async (value) => {
          try {
            if (!currentMusicTrack) return;
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
