import COLORS from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import React, { memo } from "react";
import TrackPlayer from "react-native-track-player";
import useTrackStore from "@/store/track-store";

function PlayNextMusicIcon({ size = 35 }: { size?: number }) {
  const { changeCurrentMusicTrack } = useTrackStore([
    "changeCurrentMusicTrack",
  ]);
  console.log("next");

  return (
    <Feather
      name="skip-forward"
      size={size}
      color={COLORS.secondaryIcon}
      onPress={() => {
        changeCurrentMusicTrack("next");
        TrackPlayer.skipToNext();
      }}
    />
  );
}

export default memo(PlayNextMusicIcon);
