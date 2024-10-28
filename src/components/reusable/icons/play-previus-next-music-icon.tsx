import COLORS from "./../../../constants/colors";
import { memo, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { SkipBack, SkipForward } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";

function PlayPreviousNextMusicIcon({
  size = 35,
  type,
  color = "secondary",
}: {
  size?: number;
  type: "previous" | "next";
  color?: "primary" | "secondary";
}) {
  const isButtonDisabled = useRef(false);

  const changeCurrentMusicTrack = useZustandStore(
    (state) => state.changeCurrentMusicTrack,
  );

  const onPreviousNextPress = async () => {
    if (isButtonDisabled.current) return;

    isButtonDisabled.current = true;

    const currentRepeatMode = useZustandStore.getState().currentRepeatMode;

    if (currentRepeatMode === RepeatMode.Track) {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
      return;
    } else {
      const changed = changeCurrentMusicTrack(type);
      changed && type === "previous"
        ? await TrackPlayer.skipToPrevious()
        : await TrackPlayer.skipToNext();
    }

    isButtonDisabled.current = false;
  };

  return type === "previous" ? (
    <SkipBack
      size={size}
      color={COLORS.secondaryIcon}
      fill={COLORS.secondaryIcon}
      onPress={onPreviousNextPress}
    />
  ) : (
    <SkipForward
      size={size}
      color={color === "primary" ? COLORS.primaryIcon : COLORS.secondaryIcon}
      fill={color === "primary" ? COLORS.primaryIcon : COLORS.secondaryIcon}
      onPress={onPreviousNextPress}
    />
  );
}

export default memo(PlayPreviousNextMusicIcon);
