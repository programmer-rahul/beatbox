import CustomView from "../reusable/CustomView";
import CustomText from "../reusable/CustomText";
import useCountdownTimer from "@/hooks/useCountdownTimer";

export default function CountdownTimer() {
  const secondsLeft = useCountdownTimer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (secondsLeft === null) return null;

  return (
    <CustomView className="absolute right-5 top-3 flex-row items-center gap-2">
      <CustomText>{formatTime(secondsLeft)}</CustomText>
    </CustomView>
  );
}
