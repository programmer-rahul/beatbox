import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { COLORS } from "@/constants/COLORS";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable } from "react-native";

function PlayPauseMusicIcon({
  size = 30,
  fill,
}: {
  size?: number;
  fill?: keyof typeof COLORS;
}) {
  const { playing } = useIsPlaying();

  const onTrackPlayPause = async () => {
    playing ? TrackPlayer.pause() : TrackPlayer.play();
  };

  return (
    <Pressable
      onPress={onTrackPlayPause}
      className="flex items-center"
      style={{ width: size }}
    >
      <FontAwesome6
        name={playing ? "pause" : "play"}
        color={fill ? COLORS[fill] : COLORS.PRIMARY_ICON}
        size={size}
      />
    </Pressable>
  );
}

export default PlayPauseMusicIcon;
