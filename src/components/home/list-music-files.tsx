import { View, FlatList } from "react-native";
import MusicFile from "./music-file";
import { TMusicTrack } from "@/types/store/track-store";
import ListMusicFilesHeader from "./list-music-files-header";

const ListMusicFiles = ({
  musicFiles,
  heading,
}: {
  musicFiles: TMusicTrack[];
  heading: string;
}) => {
  const musicFilesLength = musicFiles.length;
  console.log("inside list-music-files", heading);

  return (
    <View className="gap-1 px-4">
      <ListMusicFilesHeader
        heading={heading}
        musicFilesLength={musicFilesLength}
      />

      <View className="mb-20 pl-2">
        <FlatList
          data={musicFiles}
          renderItem={({ item, index }) => {
            return (
              <MusicFile
                musicFile={item}
                index={index}
                lastFile={musicFilesLength == index + 1}
              />
            );
          }}
          keyExtractor={(item) => item.url}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ListMusicFiles;
