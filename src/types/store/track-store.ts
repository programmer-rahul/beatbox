interface TMusicTrack {
  title: string;
  album: string;
  artist: string;
  cover: string;
  url: string;
  duration: number;
}

interface TTrackStore {
  allLocalMusicTracks: TMusicTrack[];
  setAllLocalMusicTracks: (newLocalMusicTracks: TMusicTrack[]) => void;

  currentMusicTrack: null | TMusicTrack;
  setCurrentMusicTrack: (musicTrack: TMusicTrack) => void;
  changeCurrentMusicTrack: (type: "previous" | "next") => boolean;

  isTrackPlaying: boolean;
  setIsTrackPlaying: (value: boolean) => void;

  isLoopingTrack: boolean;
  setIsLoopingTrack: (value: boolean) => void;

  isShufflingQueue: boolean;
  setIsShufflingQueue: (value: boolean) => void;
}

export { TMusicTrack, TTrackStore };
