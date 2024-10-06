import useTrackStore, { trackStore } from "./../../../store/track-store";
import COLORS from "./../../../constants/colors";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { Repeat } from "lucide-react-native";

function ShuffleMusicQueueIcon({ size = 25 }: { size?: number }) {
  const isShufflingQueue = trackStore((state) => state.isShufflingQueue);
  const setIsShufflingQueue = trackStore((state) => state.setIsShufflingQueue);

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
