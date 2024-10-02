import { TusePlaylistStore } from "@/types/store/playlist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const usePlaylistStore = create<TusePlaylistStore>()(
  persist(
    (set) => ({
      allPlaylists: [],
      addPlaylist: (playlist) =>
        set((state) => ({ allPlaylists: [...state.allPlaylists, playlist] })),
      removePlaylist: (playlistName) =>
        set((state) => ({
          allPlaylists: state.allPlaylists.filter(
            (playlist) => playlist.name !== playlistName,
          ),
        })),
    }),
    {
      name: "playlist-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ allPlaylists }) => ({ allPlaylists }),
    },
  ),
);

export { usePlaylistStore as playlistStore };
export default usePlaylistStore;
