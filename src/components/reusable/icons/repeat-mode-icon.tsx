import COLORS from "./../../../constants/colors";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { Repeat, Repeat2, Repeat1 } from "lucide-react-native";
import useZustandStore from "../../../store/useZustandStore";

function RepeatModeIcon({ size = 25 }: { size?: number }) {
  const currentRepeatMode = useZustandStore((state) => state.currentRepeatMode);
  const setCurrentRepeatMode = useZustandStore(
    (state) => state.setCurrentRepeatMode,
  );

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
    console.log("currentRepeatMode : ", currentRepeatMode);
    console.log("currentRepeatMode : ", currentRepeatMode == RepeatMode.Queue);
  };

  return (
    <>
      {currentRepeatMode === RepeatMode.Off && (
        <Repeat
          size={size}
          color={COLORS.secondaryIcon}
          onPress={onRepeatModeIconPress}
        />
      )}
      {currentRepeatMode === RepeatMode.Track && (
        <Repeat1
          size={size}
          color={COLORS.secondaryIcon}
          onPress={onRepeatModeIconPress}
        />
      )}
      {currentRepeatMode === RepeatMode.Queue && (
        <Repeat2
          size={size}
          color={COLORS.secondaryIcon}
          onPress={onRepeatModeIconPress}
        />
      )}
    </>
  );
}

export default RepeatModeIcon;
