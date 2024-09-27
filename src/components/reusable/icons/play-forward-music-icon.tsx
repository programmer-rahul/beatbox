import { AntDesign } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import TrackPlayer from "react-native-track-player";

function PlayForwardMusicIcon({ size = 25 }: { size?: number }) {
  return (
    <AntDesign
      name="forward"
      size={size}
      color={COLORS.secondaryIcon}
      onPress={() => {
        TrackPlayer.seekBy(10);
      }}
    />
  );
}

export default PlayForwardMusicIcon;
