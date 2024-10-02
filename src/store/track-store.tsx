import { TTrackStore } from "@/types/store/track-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStoreWithShallow } from "@/lib/create-store-with-shallow";
import { queueStore } from "./queue-store";
import { savedStore } from "./saved-store";
import { playlistStore } from "./playlist-store";

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
          if (state.isLoopingTrack) return {};

          const currentQueue = queueStore.getState().currentQueue;
          const currentSelectedQueueMusicFiles =
            currentQueue.type === "home"
              ? state.allLocalMusicTracks
              : currentQueue.type === "saved"
                ? savedStore.getState().allSavedMusicTracks
                : playlistStore
                    .getState()
                    .allPlaylists.find(
                      (playlist) => playlist.name === currentQueue.name,
                    )?.musicTracks || [];

          const currentTrackIndex = currentSelectedQueueMusicFiles.findIndex(
            (localMusicTrack) =>
              localMusicTrack.url === state.currentMusicTrack?.url,
          );

          if (currentTrackIndex === -1) {
            return {
              currentMusicTrack: currentSelectedQueueMusicFiles[1],
            };
          }

          if (
            (currentTrackIndex <= 0 && type === "previous") ||
            (currentTrackIndex + 1 >= currentSelectedQueueMusicFiles.length &&
              type === "next")
          ) {
            const isShufflingQueue = state.isShufflingQueue;

            if (!isShufflingQueue) return {};

            itChanged = true;
            return {
              currentMusicTrack:
                type === "previous"
                  ? currentSelectedQueueMusicFiles[
                      currentSelectedQueueMusicFiles.length - 1
                    ]
                  : currentSelectedQueueMusicFiles[0],
            };
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
