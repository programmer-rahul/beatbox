import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TUseZustandStore } from "../types/store/zustand-store";
import createPermissionSlice from "./slices/permission-slice";
import createPlaylistSlice from "./slices/playlist-slice";
import createQueueSlice from "./slices/queue-slice";
import createSavedSlice from "./slices/saved-slice";
import createTrackSlice from "./slices/track-slice";
import createShuffleSlice from "./slices/shuffle-slice";

const useZustandStore = create<TUseZustandStore>()(
  persist(
    (set) => ({
      ...createPermissionSlice(set),
      ...createPlaylistSlice(set),
      ...createQueueSlice(set),
      ...createSavedSlice(set),
      ...createTrackSlice(set),
      ...createShuffleSlice(set),
    }),
    {
      name: "bound-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({
        isHavePermission,
        allPlaylists,
        allSavedMusicTracks,
        allLocalMusicTracks,
        currentMusicTrack,
        isLoopingTrack,
        isShufflingQueue,
      }) => ({
        isHavePermission,
        allPlaylists,
        allSavedMusicTracks,
        allLocalMusicTracks,
        currentMusicTrack,
        isLoopingTrack,
        isShufflingQueue,
      }),
    },
  ),
);

export default useZustandStore;
