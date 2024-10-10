import { SetStateType } from "../../types/store/zustand-store";
import { TPlayerOptionsSlice } from "../../types/store/slices/player-options-slice";
import { RepeatMode } from "react-native-track-player";

const createPlayerOptionsSlice = (set: SetStateType): TPlayerOptionsSlice => ({
  currentRepeatMode: RepeatMode.Off,
  setCurrentRepeatMode: (repeatMode) =>
    set(() => ({ currentRepeatMode: repeatMode })),
});

export default createPlayerOptionsSlice;
