import { COLORS } from "@/constants/COLORS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { getRepeatMode } from "react-native-track-player/lib/src/trackPlayer";

function RepeatModeIcon({ size = 25 }: { size?: number }) {
  const [currentRepeatMode, setCurrentRepeatMode] = useState<RepeatMode>(
    RepeatMode.Off,
  );

  useEffect(() => {
    getRepeatMode().then((repeatMode) => setCurrentRepeatMode(repeatMode));
  }, []);

  const onRepeatModeIconPress = async () => {
    let nextRepeatMode = RepeatMode.Off;

    switch (currentRepeatMode) {
      case 0:
        nextRepeatMode = RepeatMode.Track;
        break;
      case 1:
        nextRepeatMode = RepeatMode.Queue;
        break;
      default:
        nextRepeatMode = RepeatMode.Off;
        break;
    }

    TrackPlayer.setRepeatMode(nextRepeatMode);
    setCurrentRepeatMode(nextRepeatMode);
  };

  return (
    <MaterialCommunityIcons
      name={
        currentRepeatMode === RepeatMode.Off
          ? "repeat"
          : currentRepeatMode === RepeatMode.Queue
            ? "repeat-variant"
            : "repeat-once"
      }
      size={size}
      color={COLORS.SECONDARY_ICON}
      onPress={onRepeatModeIconPress}
    />
  );
}

export default RepeatModeIcon;
