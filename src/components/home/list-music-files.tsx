import { View, VirtualizedList } from "react-native";
import MusicFile from "./music-file";
import { TMusicTrack } from "@/types/store/track-store";
import { TQueueType } from "@/types/store/queue-store";
import { memo } from "react";

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
        keyExtractor={(item) => item.url}
        getItem={(_, index) => {
          return musicFiles[index];
        }}
        getItemCount={() => musicFiles.length}
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(ListMusicFiles);
