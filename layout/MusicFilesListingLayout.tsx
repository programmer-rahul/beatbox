import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";
import FloatingMusicPanel from "@/components/reusable/FloatingMusicPanel";
import MusicFilesListing, {
  TMusicFilesListingType,
} from "@/components/reusable/MusicFilesListing";
import MusicFilesListingTitle from "@/components/reusable/MusicFilesListingTitle";
import NoMusicFilesMessage from "@/components/reusable/NoMusicFilesMessage";
import NoSearchMusicFilesFound from "@/components/reusable/NoSearchMusicFilesFound";
import SearchBar from "@/components/reusable/SearchBar";
import useDebouncedSearch from "@/hooks/useDebounceSearch";
import { TMusic } from "@/types/music";
import { useMemo } from "react";

export type TNoMusicFileMessage =
  | "No Music Files Found"
  | "No Favourite Music Files"
  | "No Playlist Found";

interface TMusicFilesListingLayout {
  musicFiles: TMusic[];
  title: string;
  message: TNoMusicFileMessage;
  type: TMusicFilesListingType;
}

export default function MusicFilesListingLayout({
  musicFiles,
  title,
  message,
  type,
}: TMusicFilesListingLayout) {
  const {
    searchText,
    setSearchText,
    searching,
    setSearching,
    debouncedSearchText,
  } = useDebouncedSearch();

  // Filter music files based on search text
  const filteredMusicFiles = useMemo(() => {
    return musicFiles.filter(
      (musicFile) =>
        musicFile.title.toLowerCase().includes(searchText.toLowerCase()) ||
        musicFile.artist.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [musicFiles, debouncedSearchText]);

  if (musicFiles.length === 0) {
    return <NoMusicFilesMessage message={message} />;
  }

  return (
    <>
      <CustomView className="flex-1 px-6" backgroundColor="PRIMARY_BG">
        <MusicFilesListingTitle
          count={filteredMusicFiles.length}
          title={title}
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
        {filteredMusicFiles.length === 0 ? (
          <NoSearchMusicFilesFound type="Music" />
        ) : (
          <MusicFilesListing musicFiles={filteredMusicFiles} type={type} />
        )}
      </CustomView>
      <FloatingMusicPanel />
    </>
  );
}
