import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTrackStore from "@/store/track-store";
import COLORS from "@/constants/colors";

function ShuffleMusicQueueIcon({ size = 25 }: { size?: number }) {
  const { isShufflingQueue, setIsShufflingQueue } = useTrackStore([
    "isShufflingQueue",
    "setIsShufflingQueue",
  ]);

  return (
    <MaterialCommunityIcons
      name="shuffle"
      size={size}
      color={isShufflingQueue ? COLORS.main + "cc" : COLORS.secondaryIcon}
      onPress={() => setIsShufflingQueue(!isShufflingQueue)}
    />
  );
}

export default ShuffleMusicQueueIcon;
