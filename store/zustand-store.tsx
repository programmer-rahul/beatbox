import { TZustandStore } from "@/types/zustand-store";
import { create } from "zustand";

const useZustandStore = create<TZustandStore>((set) => ({
  allMusicFiles: [],
  addMusicFiles: (files) => set(() => ({ allMusicFiles: files })),

  isPermissionGranted: false,
  setIsPermissionGranted: (value) =>
    set(() => ({ isPermissionGranted: value })),

  currentMusic: null,
  setCurrentMusic: (music) => set(() => ({ currentMusic: music })),
  changeMusic: (currentMusicId, inc) =>
    set((state) => {
      const musicIndex = state.allMusicFiles.findIndex(
        (music) => music.id === currentMusicId
      );

      if (
        (musicIndex === 0 && inc < 0) ||
        (musicIndex === state.allMusicFiles.length - 1 && inc >= 1)
      ) {
        return {
          currentMusic: state.currentMusic,
        };
      }

      return {
        currentMusic: state.allMusicFiles[musicIndex + inc],
      };
    }),

  isMusicPlaying: false,
  setIsMusicPlaying: (value) => set(() => ({ isMusicPlaying: value })),

  musicTrack: null,
  clearMusicTrack: () => set(() => ({ musicTrack: null })),
  addMusicTrack: (track) => set(() => ({ musicTrack: track })),

  currentPosition: 0,
  setCurrentPosition: (position) =>
    set(() => ({
      currentPosition: position,
    })),

  savedMusicsList: [],
  addMusicInSavedMusicList: (musicId) =>
    set((state) => ({
      savedMusicsList: [...state.savedMusicsList, { musicId }],
    })),
  removeMusicInSavedMusicList: (musicId) => {
    set((state) => ({
      savedMusicsList: state.savedMusicsList.filter(
        (music) => music.musicId !== musicId
      ),
    }));
  },
}));

export default useZustandStore;
