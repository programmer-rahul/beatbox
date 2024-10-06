import { TMusicTrack } from "./track-store";

export interface TSavedStore {
  allSavedMusicTracks: TMusicTrack[];
  addTrackInSavedMusic: (musicTrack: TMusicTrack) => void;
  removeTrackInSavedMusic: (savedMusicTrackUrl: string) => void;
}
