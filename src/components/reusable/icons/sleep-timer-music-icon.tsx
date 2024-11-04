import { Clock } from "lucide-react-native";
import COLORS from "./../../../constants/colors";
import useZustandStore from "../../../store/useZustandStore";

function SleepTimerMusicIcon({ size = 25 }: { size?: number }) {
  const setBottomSheet = useZustandStore((state) => state.setBottomSheet);

  return (
    <Clock
      size={size}
      color={COLORS.secondaryIcon}
      onPress={() => setBottomSheet({ isVisible: true, sheet: "sleep-timer" })}
    />
  );
}

export default SleepTimerMusicIcon;
