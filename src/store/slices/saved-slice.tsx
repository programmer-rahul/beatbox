import { SetStateType } from "../../types/store/zustand-store";
import { TSavedSlice } from "../../types/store/slices/saved-slice";

const createSavedSlice = (set: SetStateType): TSavedSlice => ({
  allSavedMusicTracks: [],
  addTrackInSavedMusic: (musicTrack) =>
    set((state) => ({
      allSavedMusicTracks: [...state.allSavedMusicTracks, musicTrack],
    })),
  removeTrackInSavedMusic: (savedTrackUrl) =>
    set((state) => ({
      allSavedMusicTracks: state.allSavedMusicTracks.filter(
        (savedMusic) => savedMusic.url !== savedTrackUrl,
      ),
    })),
});

export default createSavedSlice;
