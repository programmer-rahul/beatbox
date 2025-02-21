import CustomView from "@/components/reusable/CustomView";
import FloatingMusicPanel from "@/components/reusable/FloatingMusicPanel";
import MusicFilesListing from "@/components/reusable/MusicFilesListing";
import MusicFilesListingTitle from "@/components/reusable/MusicFilesListingTitle";
import NoSearchMusicFilesFound from "@/components/reusable/NoSearchMusicFilesFound";
import SearchBar from "@/components/reusable/SearchBar";
import NoMusicFilesInPlaylist from "@/components/screens/playlist/NoMusicFilesInPlaylist";
import useDebouncedSearch from "@/hooks/useDebounceSearch";
import useMusicStore from "@/store/useMusicStore";
import { TMusic } from "@/types/music";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export default function SelectedPlaylist() {
  const {
    searchText,
    setSearchText,
    searching,
    setSearching,
    debouncedSearchText,
  } = useDebouncedSearch();

  const [playlistName, setPlaylistName] = useState("");
  const [playlistMusicFiles, setPlaylistMusicFiles] = useState<TMusic[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const selectedUserPlaylist =
        useMusicStore.getState().selectedUserPlaylist;
      const userPlaylists = useMusicStore.getState().userPlaylists;
      const localMusicFiles = useMusicStore.getState().localMusicFiles;

      if (!selectedUserPlaylist || !userPlaylists || !localMusicFiles) return;

      const currentPlaylistMusicFileIds = userPlaylists.find(
        (userPlaylist) => userPlaylist.name === selectedUserPlaylist,
      );

      if (!currentPlaylistMusicFileIds) return;

      setPlaylistName(selectedUserPlaylist);
      const playlistMusicFiles = localMusicFiles.filter((localMusicFile) => {
        return currentPlaylistMusicFileIds.musicFiles.includes(
          localMusicFile.id,
        );
      });
      setPlaylistMusicFiles(playlistMusicFiles);
    }
    () => {
      setPlaylistName("");
      setPlaylistMusicFiles([]);
    };
  }, [isFocused]);

  // Filter music files based on search text
  const filterUserPlaylists = useMemo(() => {
    return playlistMusicFiles.filter(
      (musicFile) =>
        musicFile.title.toLowerCase().includes(searchText.toLowerCase()) ||
        musicFile.artist.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [playlistMusicFiles, debouncedSearchText]);

  if (playlistMusicFiles.length === 0) {
    return <NoMusicFilesInPlaylist />;
  }

  return (
    <>
      <CustomView className="flex-1 px-6" backgroundColor="PRIMARY_BG">
        <MusicFilesListingTitle
          count={filterUserPlaylists.length}
          title={playlistName}
          goBackIcon
          onGoBack={() => {
            router.back();
          }}
        />
        <CustomView className="py-4">
          <SearchBar
            searchText={searchText}
            setSearchText={(text) => {
              setSearchText(text);
              setSearching(true);
            }}
            searching={searching}
          />
        </CustomView>
        {filterUserPlaylists.length === 0 ? (
          <NoSearchMusicFilesFound type="Playlist" />
        ) : (
          <MusicFilesListing
            musicFiles={filterUserPlaylists}
            type={`PLAYLIST:${playlistName}`}
          />
        )}
      </CustomView>
      <FloatingMusicPanel />
    </>
  );
}
