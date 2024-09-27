import { TTrackStore } from "@/types/store/track-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStoreWithShallow } from "@/lib/create-store-with-shallow";
import { queueStore } from "./queue-store";
import { savedStore } from "./saved-store";

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
          const currentQueue = queueStore.getState().currentQueue;
          const currentSelectedQueueMusicFiles =
            currentQueue.type === "home"
              ? state.allLocalMusicTracks
              : savedStore.getState().allSavedMusicTracks;

          const currentTrackIndex = currentSelectedQueueMusicFiles.findIndex(
            (localMusicTrack) =>
              localMusicTrack.url === state.currentMusicTrack?.url,
          );

          if (
            (currentTrackIndex <= 0 && type === "previous") ||
            (currentTrackIndex + 1 >= currentSelectedQueueMusicFiles.length &&
              type === "next")
          ) {
            itChanged = false;
            return {};
          } else {
            itChanged = true;
            return {
              currentMusicTrack:
                type === "previous"
                  ? currentSelectedQueueMusicFiles[currentTrackIndex - 1]
                  : currentSelectedQueueMusicFiles[currentTrackIndex + 1],
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

      allCoverImages: {},
      setAllCoverImages: (coverImages) =>
        set(() => ({ allCoverImages: coverImages })),
    }),

    {
      name: "track-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({
        currentMusicTrack,
        allLocalMusicTracks,
        isLoopingTrack,
        isShufflingQueue,
      }) => ({
        currentMusicTrack,
        allLocalMusicTracks,
        isLoopingTrack,
        isShufflingQueue,
      }),
    },
  ),
);

export { useTrackStore as trackStore };
export default createStoreWithShallow(useTrackStore);
