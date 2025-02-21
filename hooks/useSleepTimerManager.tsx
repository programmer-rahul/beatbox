import useMusicStore from "@/store/useMusicStore";
import { useEffect } from "react";
import _BackgroundTimer from "react-native-background-timer";

export default function userSleepTimerManager() {
  const sleepTimerMinutes = useMusicStore((state) => state.sleepTimerMinutes);
  const setSleepTimerTimeoutId = useMusicStore(
    (state) => state.setSleepTimerTimeoutId,
  );
  const clearSleepTimer = useMusicStore((state) => state.clearSleepTimer);
  console.log("RENDERED");

  useEffect(() => {
    console.log("sleepTimerMinutes:", sleepTimerMinutes);
    const sleepTimerTimeoutId = useMusicStore.getState().sleepTimerTimeoutId;
    console.log("sleepTimerTimeoutId:", sleepTimerTimeoutId);
    if (sleepTimerMinutes) {
      const timeoutId = _BackgroundTimer.setTimeout(
        () => {
          // clearSleepTimer();
          console.log("TIMER COMPLETED");
        },
        sleepTimerMinutes * 60 * 2000,
      );

      setSleepTimerTimeoutId(timeoutId);
      console.log("SLEEP TIMER SET");
    }

    return () => {
      // if (sleepTimerMinutes) {
      //   clearSleepTimer();
      // }
    };
  }, [sleepTimerMinutes]);

  return null;
}
