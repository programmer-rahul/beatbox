import COLORS from "./../../../constants/colors";
// import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import useTrackStore from "./../../../store/track-store";
import TrackPlayer from "react-native-track-player";

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
    // <Feather
    //   name={type === "previous" ? "skip-back" : "skip-forward"}
    //   size={size}
    //   color={COLORS.secondaryIcon}
    //   onPress={async () => {
    //     changeCurrentMusicTrack(type);
    //     type === "previous"
    //       ? await TrackPlayer.skipToPrevious()
    //       : await TrackPlayer.skipToNext();
    //   }}
    // />
    null
  );
}

export default memo(PlayPreviousNextMusicIcon);
