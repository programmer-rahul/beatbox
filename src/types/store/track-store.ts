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
}

export { TMusicTrack, TTrackStore };
