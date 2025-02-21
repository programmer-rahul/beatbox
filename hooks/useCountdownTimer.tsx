import { useEffect, useState } from "react";
import BackgroundTimer from "react-native-background-timer";
import useMusicStore from "@/store/useMusicStore";

const useCountdownTimer = () => {
  const sleepTimerTimeoutId = useMusicStore(
    (state) => state.sleepTimerTimeoutId,
  );

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!sleepTimerTimeoutId) return;

    const sleepTimerStartTime = useMusicStore.getState().sleepTimerStartTime;
    const sleepTimerMinutes = useMusicStore.getState().sleepTimerMinutes;
    // console.log("_sleepTimerTimeoutId:",sleepTimerTimeoutId);
    // console.log("_sleepTimerStartTime:",sleepTimerStartTime);
    // console.log("_sleepTimerMinutes:",sleepTimerMinutes);

    if (!sleepTimerMinutes) return;

    const elapsedTime = Math.floor(
      (Date.now() - Number(sleepTimerStartTime)) / 1000,
    );
    const remainingTime = sleepTimerMinutes * 60 - elapsedTime;
    setSecondsLeft(remainingTime);

    const intervalId = BackgroundTimer.setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (typeof prevSeconds !== "number") return null;
        if (prevSeconds <= 1) {
          BackgroundTimer.clearInterval(intervalId);
          setSecondsLeft(null);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      BackgroundTimer.clearInterval(intervalId);
      setSecondsLeft(null);
    };
  }, [sleepTimerTimeoutId]);

  return secondsLeft;
};

export default useCountdownTimer;
