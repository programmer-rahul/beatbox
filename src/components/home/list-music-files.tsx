import { Text, View, VirtualizedList } from "react-native";
import MusicFile from "./music-file";
import { memo, useMemo, useState, useCallback } from "react";
import { TMusicTrack } from "../../types/store/slices/track-slice";
import { TQueueType } from "../../types/store/slices/queue-slice";
import ListMusicFilesHeader from "./list-music-files-header";
import SearchBar from "../reusable/search-bar";
import { useDebouncedValue } from "../../hooks/useDebounce";

const ListMusicFiles = ({
  musicFiles,
  queueType,
  playlistName,
  heading,
  searchBar = true,
}: {
  musicFiles: TMusicTrack[];
  queueType: TQueueType;
  playlistName?: string;
  heading?: string;
  searchBar?: boolean;
}) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebouncedValue(searchText, 300);

  const filteredMusicsList = useMemo(() => {
    if (!debouncedSearchText.trim()) return musicFiles;
    const lowerSearchText = debouncedSearchText.toLowerCase();
    return musicFiles.filter((musicFile) =>
      musicFile.title.toLowerCase().includes(lowerSearchText),
    );
  }, [debouncedSearchText, musicFiles]);

  const renderMusicFile = useCallback(
    ({ item }: { item: TMusicTrack }) => (
      <MusicFile
        musicFile={item}
        queueType={queueType}
        playlistName={playlistName}
      />
    ),
    [queueType, playlistName],
  );

  return (
    <View>
      <VirtualizedList
        data={filteredMusicsList}
        stickyHeaderHiddenOnScroll={false}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View className="bg-primaryBg py-4">
            {heading && (
              <ListMusicFilesHeader
                heading={heading}
                musicFilesLength={filteredMusicsList.length}
              />
            )}
            {searchBar && (
              <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
              />
            )}
          </View>
        }
        keyExtractor={(item) => item.url}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        renderItem={renderMusicFile}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={20}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className="h-20 w-full"></View>}
      />
      {filteredMusicsList.length === 0 && (
        <View>
          <Text className="text-center text-2xl text-primaryText">
            No Music Files Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(ListMusicFiles);
