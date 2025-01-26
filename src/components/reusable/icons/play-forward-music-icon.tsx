import { FastForward } from "lucide-react-native";
import COLORS from "./../../../constants/colors";
import TrackPlayer from "react-native-track-player";

function PlayForwardMusicIcon({ size = 25 }: { size?: number }) {
  return (
    <FastForward
      size={size}
      color={COLORS.secondaryIcon}
      fill={COLORS.secondaryIcon}
      onPress={() => {
        TrackPlayer.seekBy(10);
      }}
    />
  );
}

export default PlayForwardMusicIcon;
