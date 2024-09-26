import { View, Text, FlatList } from "react-native";
import MusicFile from "./music-file";
import { TMusicTrack } from "@/types/store/track-store";
import { memo, useEffect } from "react";

const ListMusicFiles = ({
  musicFiles,
  heading,
}: {
  musicFiles: TMusicTrack[];
  heading: string;
}) => {
  useEffect(() => {
    console.log("insidde list-music-files");
  });
  return (
    <View className="gap-1 px-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-spacemono text-xs font-bold text-primaryText">
          {heading}
        </Text>
        <Text className="font-spacemono text-xs font-bold text-secondaryText">
          {musicFiles.length}
        </Text>
      </View>

      <View className="mb-20 pl-2">
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
