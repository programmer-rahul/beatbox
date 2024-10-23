import useZustandStore from "../../store/useZustandStore";
import COLORS from "./../../constants/colors";
import { Text } from "react-native";

function MusicFileTitle({
  title,
  text = "small",
  affectSwipable = true,
}: {
  title?: string;
  text: "small" | "big";
  affectSwipable?: boolean;
}) {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  console.log("INSIDE MUSIC_FILE_TITLE");

  if (!title && !currentMusicTrack) return;
  return (
    <Text
      className={`font-primary_semibold ${
        text === "small" ? "text-xs" : "text-base"
      } text-primaryText`}
      numberOfLines={1}
      style={{
        color: affectSwipable ? COLORS.primaryText : COLORS.primaryBg,
      }}
    >
      {title ?? currentMusicTrack?.title}
    </Text>
  );
}

export default MusicFileTitle;
