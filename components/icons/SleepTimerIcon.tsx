import { COLORS } from "@/constants/COLORS";
import Feather from "@expo/vector-icons/Feather";
import useMusicStore from "@/store/useMusicStore";

function SleepTimerIcon({ size = 25 }: { size?: number }) {
  const openBottomSheet = useMusicStore((state) => state.openBottomSheet);

  const onSleepTimerPress = () => {
    openBottomSheet("SLEEP_TIMER");
  };

  return (
    <Feather
      name="clock"
      size={size}
      color={COLORS.SECONDARY_ICON}
      onPress={onSleepTimerPress}
      className="-ml-4"
    />
  );
}

export default SleepTimerIcon;
