import { TMusicTrack } from "./track-store";

interface TSavedStore {
  allSavedMusicTracks: TMusicTrack[];
  addTrackInSavedMusic: (musicTrack: TMusicTrack) => void;
  removeTrackInSavedMusic: (savedMusicTrackUrl: string) => void;
}

export { TSavedStore };
