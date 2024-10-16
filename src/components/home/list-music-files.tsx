import { View, VirtualizedList } from "react-native";
import MusicFile from "./music-file";
import { memo } from "react";
import { TMusicTrack } from "../../types/store/slices/track-slice";
import { TQueueType } from "../../types/store/slices/queue-slice";

const ListMusicFiles = ({
  musicFiles,
  queueType,
  playlistName,
}: {
  musicFiles: TMusicTrack[];
  queueType: TQueueType;
  playlistName?: string;
}) => {
  const musicFilesLength = musicFiles.length;

  console.log("INSIDE LIST_MUSIC_FILES");

  return (
    <View className="mb-2">
      <VirtualizedList
        data={musicFiles}
        keyExtractor={(item) => item.url}
        getItem={(data, index) => {
          return data[index];
        }}
        getItemCount={(data) => data.length}
        renderItem={({ item, index }: { item: TMusicTrack; index: number }) => {
          return (
            <MusicFile
              musicFile={item}
              index={index}
              lastFile={musicFilesLength == index + 1}
              queueType={queueType}
              playlistName={playlistName}
            />
          );
        }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={18}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(ListMusicFiles);
