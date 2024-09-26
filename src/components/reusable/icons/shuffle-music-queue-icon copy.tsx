import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTrackStore from "@/store/track-store";
import COLORS from "@/constants/colors";

function ShuffleMusicQueueIcon() {
  const { isShufflingQueue, setIsShufflingQueue } = useTrackStore([
    "isShufflingQueue",
    "setIsShufflingQueue",
  ]);

  return (
    <MaterialCommunityIcons
      name="shuffle"
      size={25}
      color={isShufflingQueue ? COLORS.primaryText : COLORS.secondaryIcon}
      onPress={() => setIsShufflingQueue(!isShufflingQueue)}
    />
  );
}

export default ShuffleMusicQueueIcon;
