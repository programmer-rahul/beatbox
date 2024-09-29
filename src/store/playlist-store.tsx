import { createStoreWithShallow } from "@/lib/create-store-with-shallow";
import { TusePlaylistStore } from "@/types/store/playlist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const usePlaylistStore = create<TusePlaylistStore>()(
  persist(
    (set) => ({
      allPlaylists: [
        {
          name: "yes",
          musicTracksCount: 5,
          musicTracks: [
            {
              album: "Music",
              artist: "<unknown>",
              cover: false,
              duration: 177032,
              title:
                "MAJHAIL OFFICIAL VIDEO  AP DHILLON  GURINDER GILL  MANNI SANDHU  LATEST PUNJABI SONGS 2020",
              url: "/storage/emulated/0/Music/MAJHAIL OFFICIAL VIDEO  AP DHILLON  GURINDER GILL  MANNI SANDHU  LATEST PUNJABI SONGS 2020.mp3",
            },
            {
              album: "Eduardo Riess",
              artist: "Eduardo Riess",
              cover: true,
              duration: 124680,
              title:
                "Naruto Shippuuden - Original Sound Track - Sasori's Theme",
              url: "/storage/emulated/0/Music/Naruto Shippuuden - Original Sound Track - Sasori_s Theme(MP3_320K).mp3",
            },
            {
              album: "Music",
              artist: "<unknown>",
              cover: false,
              duration: 170971,
              title: "No Love Official Audio  Shubh  thiarajxtt",
              url: "/storage/emulated/0/Music/No Love Official Audio  Shubh thiarajxtt.mp3",
            },
          ],
        },
      ],
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
      partialize: ({}) => ({}),
    },
  ),
);

export { usePlaylistStore as playlistStore };
export default createStoreWithShallow(usePlaylistStore);
