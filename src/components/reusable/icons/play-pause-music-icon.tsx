import COLORS from "./../../../constants/colors";
import { memo } from "react";
import TrackPlayer from "react-native-track-player";
import { Pause, Play } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";
import { View } from "react-native";

function PlayPauseMusicIcon({ size = 30 }: { size?: number }) {
  const isTrackPlaying = useZustandStore((state) => state.isTrackPlaying);
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);

  console.log("INSIDE PLAY_PAUSE_ICON");

  const onTrackPlayPause = async () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return (
    <View>
      {isTrackPlaying ? (
        <Pause
          size={size}
          fill={COLORS.secondaryIcon}
          onPress={onTrackPlayPause}
          strokeWidth={1.6}
        />
      ) : (
        <Play
          size={size}
          fill={COLORS.secondaryIcon}
          onPress={onTrackPlayPause}
          strokeWidth={1.6}
          className="left-[2px]"
        />
      )}
    </View>
  );
}

export default memo(PlayPauseMusicIcon);
