import { COLORS } from "@/constants/COLORS";
import TrackPlayer from "react-native-track-player";
import Entypo from "@expo/vector-icons/Entypo";

function PlayForwardMusicIcon({ size = 25 }: { size?: number }) {
  return (
    <Entypo
      name="controller-fast-forward"
      size={size}
      color={COLORS.SECONDARY_ICON}
      onPress={() => {
        TrackPlayer.seekBy(10);
      }}
    />
  );
}

export default PlayForwardMusicIcon;
