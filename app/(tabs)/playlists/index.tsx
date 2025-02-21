import CustomView from "@/components/reusable/CustomView";
import FloatingMusicPanel from "@/components/reusable/FloatingMusicPanel";
import MusicFilesListingTitle from "@/components/reusable/MusicFilesListingTitle";
import NoSearchMusicFilesFound from "@/components/reusable/NoSearchMusicFilesFound";
import PlaylistsListing from "@/components/reusable/PlaylistsListing";
import SearchBar from "@/components/reusable/SearchBar";
import useDebouncedSearch from "@/hooks/useDebounceSearch";
import useMusicStore from "@/store/useMusicStore";
import AddNewPlaylistBtn from "./AddNewPlaylistBtn";
import { useMemo } from "react";
import NoMusicFilesMessage from "@/components/reusable/NoMusicFilesMessage";

export default function PlaylistPage() {
  const userPlaylists = useMusicStore((state) => state.userPlaylists);

  const {
    searchText,
    setSearchText,
    searching,
    setSearching,
    debouncedSearchText,
  } = useDebouncedSearch();

  // Filter music files based on search text
  const filteredUserPlaylists = useMemo(() => {
    return userPlaylists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [userPlaylists, debouncedSearchText]);

  if (userPlaylists.length === 0) {
    return <NoMusicFilesMessage message="No Playlist Found" />;
  }

  return (
    <>
      <CustomView className="flex-1 px-6" backgroundColor="PRIMARY_BG">
        <MusicFilesListingTitle
          count={filteredUserPlaylists.length}
          title="YOUR PLAYLISTS"
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
        {filteredUserPlaylists.length === 0 ? (
          <>
            <AddNewPlaylistBtn />
            <NoSearchMusicFilesFound type="Playlist" />
          </>
        ) : (
          <PlaylistsListing playlists={filteredUserPlaylists} />
        )}
      </CustomView>
      <FloatingMusicPanel />
    </>
  );
}
