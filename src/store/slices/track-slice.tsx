import { SetStateType } from "../../types/store/zustand-store";
import { TTrackSlice } from "../../types/store/slices/track-slice";

const createTrackSlice = (set: SetStateType): TTrackSlice => ({
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

      const currentQueue = state.currentQueue;
      const currentSelectedQueueMusicFiles =
        currentQueue.type === "home"
          ? state.allLocalMusicTracks
          : currentQueue.type === "saved"
            ? state.allSavedMusicTracks
            : state.allPlaylists.find(
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
});

export default createTrackSlice;
