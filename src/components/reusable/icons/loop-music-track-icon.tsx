// import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "./../../../constants/colors";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { Repeat2 } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";

function LoopMusicTrackIcon({ size = 25 }: { size?: number }) {
  const isLoopingTrack = useZustandStore((state) => state.isLoopingTrack);
  const setIsLoopingTrack = useZustandStore((state) => state.setIsLoopingTrack);

  return (
    <Repeat2
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
