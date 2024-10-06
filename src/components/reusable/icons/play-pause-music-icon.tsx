import COLORS from "./../../../constants/colors";
// import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import TrackPlayer from "react-native-track-player";
import useTrackStore, { trackStore } from "./../../../store/track-store";
import { Pause, Play } from "lucide-react-native";

function PlayPauseMusicIcon({ size = 30 }: { size?: number }) {
  const isTrackPlaying = trackStore((state) => state.isTrackPlaying);
  const setIsTrackPlaying = trackStore((state) => state.setIsTrackPlaying);

  console.log("INSIDE PLAY_PAUSE_ICON");

  const onTrackPlayPause = async () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return isTrackPlaying ? (
    <Pause
      color={COLORS.main}
      size={size}
      onPress={onTrackPlayPause}
      strokeWidth={1.6}
    />
  ) : (
    <Play
      color={COLORS.secondaryIcon}
      size={size}
      onPress={onTrackPlayPause}
      strokeWidth={1.6}
    />
  );
}

export default memo(PlayPauseMusicIcon);
