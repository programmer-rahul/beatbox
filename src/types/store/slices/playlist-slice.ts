import { TMusicTrack } from "./track-slice";

export interface TPlaylist {
  name: string;
  musicTracksCount: number;
  musicTracks: TMusicTrack[];
}

export interface TPlaylistSlice {
  allPlaylists: TPlaylist[];

  addPlaylist: (playlist: TPlaylist) => void;
  renamePlaylist: (playlistName: string, newPlaylistName: string) => void;
  removePlaylist: (playlistName: string) => void;

  addTrackInPlaylists: (
    currentTrack: TMusicTrack,
    playlistTitles: string[],
    type: "add" | "remove",
  ) => void;
}
