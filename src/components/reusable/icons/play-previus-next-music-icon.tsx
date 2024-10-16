import COLORS from "./../../../constants/colors";
import { memo } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { SkipBack, SkipForward } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";

function PlayPreviousNextMusicIcon({
  size = 35,
  type,
}: {
  size?: number;
  type: "previous" | "next";
}) {
  const changeCurrentMusicTrack = useZustandStore(
    (state) => state.changeCurrentMusicTrack,
  );

  const onPreviousNextPress = async () => {
    const currentRepeatMode = useZustandStore.getState().currentRepeatMode;

    if (currentRepeatMode === RepeatMode.Track) {
      TrackPlayer.seekTo(0);
      TrackPlayer.play();
      return;
    } else {
      const changed = changeCurrentMusicTrack(type);
      changed && type === "previous"
        ? await TrackPlayer.skipToPrevious()
        : await TrackPlayer.skipToNext();
    }
  };

  console.log("next");

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
      color={COLORS.secondaryIcon}
      fill={COLORS.secondaryIcon}
      onPress={onPreviousNextPress}
    />
  );
}

export default memo(PlayPreviousNextMusicIcon);
