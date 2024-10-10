import { RepeatMode } from "react-native-track-player";

export interface TPlayerOptionsSlice {
  currentRepeatMode: RepeatMode;
  setCurrentRepeatMode: (repeatMode: RepeatMode) => void;
}
