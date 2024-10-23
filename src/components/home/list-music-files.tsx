import { View, VirtualizedList } from "react-native";
import MusicFile from "./music-file";
import { memo } from "react";
import { TMusicTrack } from "../../types/store/slices/track-slice";
import { TQueueType } from "../../types/store/slices/queue-slice";
import ListMusicFilesHeader from "./list-music-files-header";

const ListMusicFiles = ({
  musicFiles,
  queueType,
  playlistName,
  heading,
}: {
  musicFiles: TMusicTrack[];
  queueType: TQueueType;
  playlistName?: string;
  heading?: string;
}) => {
  const musicFilesLength = musicFiles.length;

  console.log("INSIDE LIST_MUSIC_FILES");

  return (
    <View className="">
      <VirtualizedList
        data={musicFiles}
        stickyHeaderHiddenOnScroll={false}
        ListHeaderComponent={
          heading ? (
            <ListMusicFilesHeader
              heading={heading}
              musicFilesLength={musicFilesLength}
            />
          ) : (
            <></>
          )
        }
        keyExtractor={(item) => item.url}
        getItem={(data, index) => {
          return data[index];
        }}
        getItemCount={(data) => data.length}
        renderItem={({ item }: { item: TMusicTrack }) => {
          return (
            <MusicFile
              musicFile={item}
              queueType={queueType}
              playlistName={playlistName}
            />
          );
        }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={20}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className="h-20 w-full"></View>}
      />
    </View>
  );
};

export default memo(ListMusicFiles);
