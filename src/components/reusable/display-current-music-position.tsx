import { formatMusicFileDuration } from "@/lib/helper";
import React from "react";
import { Text } from "react-native";
import { useProgress } from "react-native-track-player";

function DisplayCurrentMusicPosition() {
  const progress = useProgress();
  //   console.log("inside music progress display");
  return (
    <Text className="font-spacemono text-xs text-secondaryText">
      {formatMusicFileDuration(progress.position, "seconds")}
    </Text>
  );
}

export default DisplayCurrentMusicPosition;
