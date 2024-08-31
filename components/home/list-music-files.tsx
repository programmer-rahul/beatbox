import { View, Text, FlatList } from "react-native";
import { TMusicFile } from "@/types/music";
import ListMusic from "./list-music";

const ListMusicFiles = ({ musicFiles }: { musicFiles: TMusicFile[] }) => {
  return (
    <View className="space-y-4 mb-12">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-base font-bold text-neutral-800">
          All Music files
        </Text>
        <Text className="text-sm font-bold text-neutral-500">
          {musicFiles.length}
        </Text>
      </View>

      <View>
        <FlatList
          data={musicFiles}
          renderItem={({ item }) => (
            <ListMusic filename={item.filename} duration={item.duration} />
          )}
        />
      </View>
    </View>
  );
};

export default ListMusicFiles;
