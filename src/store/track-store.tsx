import { TTrackStore } from "@/types/store/track-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const trackStore = create<TTrackStore>()(
  persist(
    (set) => ({
      allLocalMusicTracks: [],
      setAllLocalMusicTracks: (newLocalMusicTracks) =>
        set(() => ({ allLocalMusicTracks: newLocalMusicTracks })),

      currentMusicTrack: null,
      setCurrentMusicTrack: (musicTrack) =>
        set(() => ({ currentMusicTrack: musicTrack })),
    }),
    {
      name: "track-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ allLocalMusicTracks }) => ({ allLocalMusicTracks }),
    }
  )
);

export default trackStore;
