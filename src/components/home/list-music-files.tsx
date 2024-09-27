import { View, FlatList } from "react-native";
import MusicFile from "./music-file";
import { TMusicTrack } from "@/types/store/track-store";
import ListMusicFilesHeader from "./list-music-files-header";
import { TQueueType } from "@/types/store/queue-store";

const ListMusicFiles = ({
  musicFiles,
  heading,
  queueType,
}: {
  musicFiles: TMusicTrack[];
  heading: string;
  queueType: TQueueType;
}) => {
  const musicFilesLength = musicFiles.length;
  console.log("inside list-music-files", heading);

  return (
    <View className="gap-1 px-5">
      <ListMusicFilesHeader
        heading={heading}
        musicFilesLength={musicFilesLength}
      />

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
    </View>
  );
};

export default ListMusicFiles;
