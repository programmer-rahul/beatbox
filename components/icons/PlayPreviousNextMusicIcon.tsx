import { COLORS } from "@/constants/COLORS";
import { memo, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function PlayPreviousNextMusicIcon({
  size = 35,
  type,
  fill,
}: {
  size?: number;
  type: "previous" | "next";
  fill?: keyof typeof COLORS;
}) {
  const isButtonDisabled = useRef(false);

  const onPreviousNextPress = async () => {
    if (isButtonDisabled.current) return;

    isButtonDisabled.current = true;

    const currentRepeatMode = await TrackPlayer.getRepeatMode();

    if (currentRepeatMode === RepeatMode.Track) {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
      return;
    } else {
      type === "previous"
        ? await TrackPlayer.skipToPrevious()
        : await TrackPlayer.skipToNext();
    }

    isButtonDisabled.current = false;
  };

  return (
    <MaterialIcons
      name={type === "previous" ? "skip-previous" : "skip-next"}
      size={size}
      color={fill ? COLORS[fill] : COLORS.SECONDARY_ICON}
      onPress={onPreviousNextPress}
    />
  );
}

export default memo(PlayPreviousNextMusicIcon);
