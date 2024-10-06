import COLORS from "./../../../constants/colors";
// import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import TrackPlayer from "react-native-track-player";
import useTrackStore, { trackStore } from "./../../../store/track-store";

function PlayPauseMusicIcon({ size = 35 }: { size?: number }) {
  const isTrackPlaying = trackStore(state => state.isTrackPlaying);
  const setIsTrackPlaying = trackStore(state => state.setIsTrackPlaying);

  console.log("icon");

  const onTrackPlayPause = async () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return (
    // <Feather
    //   name={isTrackPlaying ? "pause-circle" : "play-circle"}
    //   size={size}
    //   color={isTrackPlaying ? COLORS.main : COLORS.secondaryIcon}
    //   onPress={onTrackPlayPause}
    // />
    null
  );
}

export default memo(PlayPauseMusicIcon);
