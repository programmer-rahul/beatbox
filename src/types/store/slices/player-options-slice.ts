import { RepeatMode } from "react-native-track-player";

interface TSleepTimer {
  status: boolean;
  timeoutId: number;
  minutes: number;
  startedTime: null | Date;
}

export interface TPlayerOptionsSlice {
  currentRepeatMode: RepeatMode;
  setCurrentRepeatMode: (repeatMode: RepeatMode) => void;

  sleepTimer: TSleepTimer;
  setSleepTimer: (sleepTimer: TSleepTimer) => void;
}
