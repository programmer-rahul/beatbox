import COLORS from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import React, { memo } from "react";
import TrackPlayer from "react-native-track-player";
import useTrackStore from "@/store/track-store";

function PlayPreviousNextMusicIcon({
  size = 35,
  type,
}: {
  size?: number;
  type: "previous" | "next";
}) {
  const { changeCurrentMusicTrack } = useTrackStore([
    "changeCurrentMusicTrack",
  ]);
  console.log("next");

  return (
    <Feather
      name={type === "previous" ? "skip-back" : "skip-forward"}
      size={size}
      color={COLORS.secondaryIcon}
      onPress={() => {
        type === "previous"
          ? TrackPlayer.skipToPrevious()
          : TrackPlayer.skipToNext();
        changeCurrentMusicTrack(type);
      }}
    />
  );
}

export default memo(PlayPreviousNextMusicIcon);
