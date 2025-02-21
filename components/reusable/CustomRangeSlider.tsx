import { View } from "react-native";
import TrackPlayer, {
  useProgress,
  useActiveTrack,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import { COLORS } from "@/constants/COLORS";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  const activeTrack = useActiveTrack();
  const progress = useProgress();

  return (
    <View>
      <Slider
        minimumValue={1}
        maximumValue={Math.floor(totalMusicDuration / 1000)}
        onSlidingComplete={async (value) => {
          try {
            if (!activeTrack) return;
            await TrackPlayer.seekTo(value);
          } catch (_) {}
        }}
        value={progress.position}
        thumbTintColor={COLORS.MAIN}
        minimumTrackTintColor={COLORS.MAIN}
        maximumTrackTintColor={COLORS.SECONDARY_ICON}
      />
    </View>
  );
};

export default CustomRangeSlider;
