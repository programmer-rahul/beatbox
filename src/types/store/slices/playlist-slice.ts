import { TMusicTrack } from "./track-slice";

export interface TPlaylist {
  name: string;
  musicTracksCount: number;
  musicTracks: TMusicTrack[];
}

export interface TPlaylistSlice {
  allPlaylists: TPlaylist[];
  addPlaylist: (playlist: TPlaylist) => void;
  removePlaylist: (playlistName: string) => void;
}
