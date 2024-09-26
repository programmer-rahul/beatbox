import { View } from "react-native";
import Slider from "@react-native-community/slider";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import TrackPlayer, { useProgress } from "react-native-track-player";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const progress = useProgress();
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

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
