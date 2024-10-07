import COLORS from "./../../../constants/colors";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { Repeat } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";

function ShuffleMusicQueueIcon({ size = 25 }: { size?: number }) {
  const isShufflingQueue = useZustandStore((state) => state.isShufflingQueue);
  const setIsShufflingQueue = useZustandStore(
    (state) => state.setIsShufflingQueue,
  );

  return (
    <Repeat
      size={size}
      color={isShufflingQueue ? COLORS.main + "cc" : COLORS.secondaryIcon}
      onPress={() => {
        setIsShufflingQueue(!isShufflingQueue);
        TrackPlayer.setRepeatMode(
          isShufflingQueue ? RepeatMode.Off : RepeatMode.Queue,
        );
      }}
    />
  );
}

export default ShuffleMusicQueueIcon;
