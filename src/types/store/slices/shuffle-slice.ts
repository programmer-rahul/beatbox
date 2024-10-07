export interface TShuffleSlice {
  isLoopingTrack: boolean;
  setIsLoopingTrack: (value: boolean) => void;

  isShufflingQueue: boolean;
  setIsShufflingQueue: (value: boolean) => void;
}
