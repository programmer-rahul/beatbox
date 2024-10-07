import COLORS from "./../../../constants/colors";
import { memo } from "react";
import TrackPlayer from "react-native-track-player";
import { Pause, Play } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";

function PlayPauseMusicIcon({ size = 30 }: { size?: number }) {
  const isTrackPlaying = useZustandStore((state) => state.isTrackPlaying);
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);

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
