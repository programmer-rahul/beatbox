import { FastForward } from "lucide-react-native";
import COLORS from "./../../../constants/colors";
import TrackPlayer from "react-native-track-player";

function PlayBackwardMusicIcon({ size = 25 }: { size?: number }) {
  return (
    <FastForward
      size={size}
      color={COLORS.secondaryIcon}
      fill={COLORS.secondaryIcon}
      onPress={() => {
        TrackPlayer.seekBy(-10);
      }}
      className="rotate-180"
    />
  );
}

export default PlayBackwardMusicIcon;
