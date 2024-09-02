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
}));

export default useZustandStore;
