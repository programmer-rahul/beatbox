import { View, Text } from "react-native";
import React from "react";
import { TMusicFile } from "@/types/music";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

const ListMusicFiles = ({ musicFiles }: { musicFiles: TMusicFile[] }) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center pb-2">
        <Text className="text-base font-bold text-neutral-800">
          All Music files
        </Text>
        <Text className="text-sm font-bold text-neutral-500">
          {musicFiles.length}
        </Text>
      </View>

      <View className="space-y-2">
        {musicFiles.map((music, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center bg-lime-100 p-1 rounded-md"
          >
            <View className="flex-row items-center space-x-2 w-4/5">
              <View className="w-9 h-9 items-center justify-center bg-lime-200/20 border border-lime-600 rounded-md">
                <Feather name="music" size={22} color="#65a30d" />
              </View>
              <View>
                <Text numberOfLines={1}>{music.filename}</Text>
              </View>
            </View>
            <View>
              <Entypo name="dots-three-horizontal" size={20} />
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default ListMusicFiles;
