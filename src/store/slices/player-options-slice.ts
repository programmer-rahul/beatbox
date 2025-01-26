import { SetStateType } from "../../types/store/zustand-store";
import { TPlayerOptionsSlice } from "../../types/store/slices/player-options-slice";
import { RepeatMode } from "react-native-track-player";

const createPlayerOptionsSlice = (set: SetStateType): TPlayerOptionsSlice => ({
  currentRepeatMode: RepeatMode.Off,
  setCurrentRepeatMode: (repeatMode) =>
    set(() => ({ currentRepeatMode: repeatMode })),

  sleepTimer: { status: false, minutes: 0, timeoutId: 0 },
  setSleepTimer: (sleepTimer) => set(() => ({ sleepTimer: sleepTimer })),
});

export default createPlayerOptionsSlice;
