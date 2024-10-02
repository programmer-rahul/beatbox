import { TMusicTrack } from "./track-store";

interface TPlaylist {
  name: string;
  musicTracksCount: number;
  musicTracks: TMusicTrack[];
}

interface TusePlaylistStore {
  allPlaylists: TPlaylist[];
  addPlaylist: (playlist: TPlaylist) => void;
  removePlaylist: (playlistName: string) => void;
}

export { TusePlaylistStore, TPlaylist };
