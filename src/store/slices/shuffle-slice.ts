import { SetStateType } from "../../types/store/zustand-store";
import { TShuffleSlice } from "../../types/store/slices/shuffle-slice";

const createShuffleSlice = (set: SetStateType): TShuffleSlice => ({
  isLoopingTrack: false,
  setIsLoopingTrack: (value) => set(() => ({ isLoopingTrack: value })),
  isShufflingQueue: false,
  setIsShufflingQueue: (value) => set(() => ({ isShufflingQueue: value })),
});

export default createShuffleSlice;
