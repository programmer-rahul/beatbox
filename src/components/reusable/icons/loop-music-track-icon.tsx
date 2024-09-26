import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTrackStore from "@/store/track-store";
import COLORS from "@/constants/colors";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

function LoppMusicTrackIcon() {
  const { isLoopingTrack, setIsLoopingTrack } = useTrackStore([
    "isLoopingTrack",
    "setIsLoopingTrack",
  ]);

  return (
    <MaterialCommunityIcons
      name="repeat-variant"
      size={30}
      color={isLoopingTrack ? COLORS.primaryText : COLORS.secondaryIcon}
      onPress={() => {
        setIsLoopingTrack(!isLoopingTrack);
        TrackPlayer.setRepeatMode(
          isLoopingTrack ? RepeatMode.Queue : RepeatMode.Track,
        );
      }}
    />
  );
}

export default LoppMusicTrackIcon;
