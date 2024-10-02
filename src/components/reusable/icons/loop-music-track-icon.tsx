import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTrackStore from "@/store/track-store";
import COLORS from "@/constants/colors";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

function LoopMusicTrackIcon({ size = 25 }: { size?: number }) {
  const { isLoopingTrack, setIsLoopingTrack } = useTrackStore([
    "isLoopingTrack",
    "setIsLoopingTrack",
  ]);

  return (
    <MaterialCommunityIcons
      name="repeat-variant"
      size={size}
      color={isLoopingTrack ? COLORS.main + "cc" : COLORS.secondaryIcon}
      onPress={() => {
        setIsLoopingTrack(!isLoopingTrack);
        TrackPlayer.setRepeatMode(
          isLoopingTrack ? RepeatMode.Off : RepeatMode.Track,
        );
      }}
    />
  );
}

export default LoopMusicTrackIcon;
