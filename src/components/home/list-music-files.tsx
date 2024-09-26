import { View, Text, FlatList } from "react-native";
import MusicFile from "./music-file";
import { TMusicTrack } from "@/types/store/track-store";

const ListMusicFiles = ({
  musicFiles,
  heading,
}: {
  musicFiles: TMusicTrack[];
  heading: string;
}) => {
  return (
    <View className="px-4 gap-1">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-xs font-bold text-primaryText font-spacemono">
          {heading}
        </Text>
        <Text className="text-xs font-bold text-secondaryText font-spacemono">
          {musicFiles.length}
        </Text>
      </View>

      <View className="pl-2 mb-20">
        <FlatList
          data={musicFiles}
          renderItem={({ item, index }) => {
            return (
              <MusicFile
                musicFile={item}
                index={index}
                lastFile={index + 1 === musicFiles.length}
              />
            );
          }}
          keyExtractor={(item) => item.url}
          initialNumToRender={5}
          maxToRenderPerBatch={12}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ListMusicFiles;
