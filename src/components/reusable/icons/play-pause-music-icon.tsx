import COLORS from "./../../../constants/colors";
import TrackPlayer from "react-native-track-player";
import { Pause, Play } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";
import { View } from "react-native";

function PlayPauseMusicIcon({
  size = 30,
  small = false,
}: {
  size?: number;
  small?: boolean;
}) {
  const isTrackPlaying = useZustandStore((state) => state.isTrackPlaying);
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);

  console.log("INSIDE PLAY_PAUSE_ICON");

  const onTrackPlayPause = async () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return (
    <View
      className="rounded-full bg-main"
      style={{
        padding: small ? 4 : 8,
      }}
    >
      {isTrackPlaying ? (
        <Pause
          size={size}
          fill={COLORS.secondaryBg}
          onPress={onTrackPlayPause}
          strokeWidth={1.6}
        />
      ) : (
        <View
          style={{
            right: small ? 1 : 0,
          }}
        >
          <Play
            size={size}
            fill={COLORS.secondaryBg}
            onPress={onTrackPlayPause}
            strokeWidth={1.6}
            className="left-[2px]"
          />
        </View>
      )}
    </View>
  );
}

export default PlayPauseMusicIcon;
