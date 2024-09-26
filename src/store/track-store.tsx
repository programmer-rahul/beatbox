import { TTrackStore } from "@/types/store/track-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStoreWithShallow } from "@/lib/create-store-with-shallow";

const useTrackStore = create<TTrackStore>()(
  persist(
    (set) => ({
      allLocalMusicTracks: [],
      setAllLocalMusicTracks: (newLocalMusicTracks) =>
        set(() => ({ allLocalMusicTracks: newLocalMusicTracks })),

      currentMusicTrack: null,
      setCurrentMusicTrack: (musicTrack) =>
        set(() => ({ currentMusicTrack: musicTrack })),
      changeCurrentMusicTrack: (type) => {
        let itChanged = false;
        set((state) => {
          const currentTrackIndex = state.allLocalMusicTracks.findIndex(
            (localMusicTrack) =>
              localMusicTrack.url === state.currentMusicTrack?.url,
          );

          if (
            (currentTrackIndex <= 0 && type === "previous") ||
            (currentTrackIndex + 1 >= state.allLocalMusicTracks.length &&
              type === "next")
          ) {
            itChanged = false;
            return {};
          } else {
            itChanged = true;
            return {
              currentMusicTrack:
                type === "previous"
                  ? state.allLocalMusicTracks[currentTrackIndex - 1]
                  : state.allLocalMusicTracks[currentTrackIndex + 1],
            };
          }
        });

        return itChanged;
      },

      isTrackPlaying: false,
      setIsTrackPlaying: (value) => set(() => ({ isTrackPlaying: value })),
      isLoopingTrack: false,
      setIsLoopingTrack: (value) => set(() => ({ isLoopingTrack: value })),
      isShufflingQueue: false,
      setIsShufflingQueue: (value) => set(() => ({ isShufflingQueue: value })),
    }),

    {
      name: "track-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({
        allLocalMusicTracks,
        isLoopingTrack,
        isShufflingQueue,
      }) => ({
        allLocalMusicTracks,
        isLoopingTrack,
        isShufflingQueue,
      }),
    },
  ),
);

export { useTrackStore as trackStore };
export default createStoreWithShallow(useTrackStore);
