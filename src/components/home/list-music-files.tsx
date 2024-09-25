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

      <View className="pl-2 mb-28">
        <FlatList
          data={musicFiles}
          renderItem={({ item }) => {
            return <MusicFile musicFile={item} />;
          }}
          keyExtractor={(item) => item.url}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ListMusicFiles;
