import { View, FlatList } from "react-native";
import MusicFile from "./music-file";
import { TMusicTrack } from "@/types/store/track-store";
import { TQueueType } from "@/types/store/queue-store";

const ListMusicFiles = ({
  musicFiles,
  queueType,
}: {
  musicFiles: TMusicTrack[];
  queueType: TQueueType;
}) => {
  const musicFilesLength = musicFiles.length;

  return (
    <View className="mb-2">
      <FlatList
        data={musicFiles}
        renderItem={({ item, index }) => {
          return (
            <MusicFile
              musicFile={item}
              index={index}
              lastFile={musicFilesLength == index + 1}
              queueType={queueType}
            />
          );
        }}
        keyExtractor={(item) => item.url}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListMusicFiles;
