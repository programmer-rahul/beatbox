import { Clock } from "lucide-react-native";
import COLORS from "./../../../constants/colors";
import useZustandStore from "../../../store/useZustandStore";

function SleepTimerMusicIcon({ size = 25 }: { size?: number }) {
  const setBottomSheet = useZustandStore((state) => state.setBottomSheet);
  const sleepTimer = useZustandStore((state) => state.sleepTimer);

  return (
    <Clock
      size={size}
      onPress={() => setBottomSheet({ isVisible: true, sheet: "sleep-timer" })}
      fill={sleepTimer.status ? COLORS.main : "transparent"}
      stroke={
        sleepTimer.status ? COLORS.primaryText + "99" : COLORS.secondaryIcon
      }
    />
  );
}

export default SleepTimerMusicIcon;
