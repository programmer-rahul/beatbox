import { TMusicTrack } from "./track-store";

export interface TPlaylist {
  name: string;
  musicTracksCount: number;
  musicTracks: TMusicTrack[];
}

export interface TusePlaylistStore {
  allPlaylists: TPlaylist[];
  addPlaylist: (playlist: TPlaylist) => void;
  removePlaylist: (playlistName: string) => void;
}
