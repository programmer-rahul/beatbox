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
}));

export default useZustandStore;
