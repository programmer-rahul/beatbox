import { TTrackStore } from "@/types/store/track-store";
import { create } from "zustand";

const trackStore = create<TTrackStore>((set) => ({
  allLocalMusicTracks: [],
  setAllLocalMusicTracks: (newLocalMusicTracks) =>
    set(() => ({ allLocalMusicTracks: newLocalMusicTracks })),

  currentMusicTrack: null,
  setCurrentMusicTrack: (musicTrack) =>
    set(() => ({ currentMusicTrack: musicTrack })),
}));

export default trackStore;
