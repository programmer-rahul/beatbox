import { SetStateType } from "../../types/store/zustand-store";
import { TPlaylistSlice } from "../../types/store/slices/playlist-slice";

const createPlaylistSlice = (set: SetStateType): TPlaylistSlice => ({
  allPlaylists: [],
  addPlaylist: (playlist) =>
    set((state) => ({ allPlaylists: [...state.allPlaylists, playlist] })),
  removePlaylist: (playlistName) =>
    set((state) => ({
      allPlaylists: state.allPlaylists.filter(
        (playlist) => playlist.name !== playlistName,
      ),
    })),
});

export default createPlaylistSlice;
