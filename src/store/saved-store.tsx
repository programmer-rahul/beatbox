import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TSavedStore } from "@/types/store/saved-store";
import { createStoreWithShallow } from "@/lib/create-store-with-shallow";

const useSavedStore = create<TSavedStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "saved-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ allSavedMusicTracks }) => ({ allSavedMusicTracks }),
    },
  ),
);
export { useSavedStore as savedStore };
export default createStoreWithShallow(useSavedStore);
