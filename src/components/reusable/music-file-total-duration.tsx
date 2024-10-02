import COLORS from "@/constants/colors";
import { formatMusicFileDuration } from "@/lib/helper";
import { Text } from "react-native";
import useTrackStore from "@/store/track-store";

function MusicFileTotalDuration() {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  console.log("INSIDE MUSIC_FILE_TOTAL_DURATION");

  if (!currentMusicTrack) return;
  return (
    <Text
      className="font-primary_regular text-xs text-secondaryText"
      style={{
        color: COLORS.secondaryText,
      }}
    >
      {formatMusicFileDuration(currentMusicTrack.duration, "milliseconds")}
    </Text>
  );
}

export default MusicFileTotalDuration;
