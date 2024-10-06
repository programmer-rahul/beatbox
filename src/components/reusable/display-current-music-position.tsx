import { Text } from "react-native";
import { useProgress } from "react-native-track-player";
import COLORS from "../../constants/colors";
import { formatMusicFileDuration } from "../../lib/helper";

function DisplayCurrentMusicPosition() {
  const progress = useProgress();
  return (
    <Text
      className="font-primary_regular text-xs text-secondaryText"
      style={{
        color: COLORS.secondaryText,
      }}
    >
      {formatMusicFileDuration(progress.position, "seconds")}
    </Text>
  );
}

export default DisplayCurrentMusicPosition;
