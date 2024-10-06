import COLORS from "./../../../constants/colors";
// import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import useTrackStore, { trackStore } from "./../../../store/track-store";
import TrackPlayer from "react-native-track-player";
import { SkipBack, SkipForward } from "lucide-react-native";

function PlayPreviousNextMusicIcon({
  size = 35,
  type,
}: {
  size?: number;
  type: "previous" | "next";
}) {
  const changeCurrentMusicTrack = trackStore(
    (state) => state.changeCurrentMusicTrack,
  );

  const onPreviousNextPress = async () => {
    changeCurrentMusicTrack(type);
    type === "previous"
      ? await TrackPlayer.skipToPrevious()
      : await TrackPlayer.skipToNext();
  };

  console.log("next");

  return type === "previous" ? (
    <SkipBack
      size={size}
      color={COLORS.secondaryIcon}
      onPress={onPreviousNextPress}
    />
  ) : (
    <SkipForward
      size={size}
      color={COLORS.secondaryIcon}
      onPress={onPreviousNextPress}
    />
  );
}

export default memo(PlayPreviousNextMusicIcon);
