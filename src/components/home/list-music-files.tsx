import { View, Text, FlatList } from "react-native";
import ListMusic from "./list-music";
import { TMusicTrack } from "@/types/store/track-store";

const ListMusicFiles = ({
  musicFiles,
  heading,
}: {
  musicFiles: TMusicTrack[];
  heading: string;
}) => {
  return (
    <View className="gap-4 px-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-xs font-bold text-primaryText font-spacemono">
          {heading}
        </Text>
        <Text className="text-xs font-bold text-secondaryText font-spacemono">
          {musicFiles.length}
        </Text>
      </View>

      <View className="mb-20 pl-2">
        <FlatList
          data={musicFiles}
          renderItem={({ item }) => {
            return <ListMusic musicFile={item} />;
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ListMusicFiles;
