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

  addTrackInPlaylists: (currentTrack, playlistTitles, type) =>
    set((state) => {
      playlistTitles.forEach((selectedPlaylist) => {
        const playlistIndex = state.allPlaylists.findIndex(
          (playlist) => playlist.name === selectedPlaylist,
        );
        // check is there track is available in playlist or not
        const isTrackAlreadyPresent = state.allPlaylists[
          playlistIndex
        ].musicTracks.some((track) => track.title == currentTrack.title);
        console.log("isTrackAlreadyPresent", isTrackAlreadyPresent);

        if (isTrackAlreadyPresent && type === "remove") {
          // remove track from playlist
          state.allPlaylists[playlistIndex].musicTracksCount--;
          state.allPlaylists[playlistIndex].musicTracks = state.allPlaylists[
            playlistIndex
          ].musicTracks.filter((track) => track.title !== currentTrack.title);
        } else if (!isTrackAlreadyPresent && type === "add") {
          // add track in playlist
          state.allPlaylists[playlistIndex].musicTracksCount++;
          state.allPlaylists[playlistIndex].musicTracks.push(currentTrack);
        }
      });

      return { allPlaylists: [...state.allPlaylists] };
    }),
});

export default createPlaylistSlice;
