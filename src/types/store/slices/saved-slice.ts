import { TMusicTrack } from "./track-slice";

export interface TSavedSlice {
  allSavedMusicTracks: TMusicTrack[];
  addTrackInSavedMusic: (musicTrack: TMusicTrack) => void;
  removeTrackInSavedMusic: (savedMusicTrackUrl: string) => void;
}
