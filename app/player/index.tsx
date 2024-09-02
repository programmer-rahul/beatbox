import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import MusicPlayerControls from "@/components/player/music-player-controls";
import useZustandStore from "@/store/zustand-store";

const Index = () => {
  const { currentMusic } = useZustandStore();

  return (
    <SafeAreaView className="px-4 space-y-10">
      <View className="py-1 flex flex-row justify-between items-center border-b border-neutral-300">
        <View>
          <Link href={"/(home)"}>
            <Feather name="chevron-left" size={26} />
          </Link>
        </View>
        <Entypo name="dots-three-vertical" size={18} />
      </View>
      <View className="space-y-4">
        <View className="w-4/5 aspect-square rounded-full border border-lime-300 bg-lime-200/20 self-center my-10"></View>
        {/* song name  */}
        <View className="flex-row justify-between items-center">
          <Text
            className="text-base font-semibold w-full max-w-[80%]"
            numberOfLines={1}
          >
            {currentMusic?.filename}
          </Text>
          <Feather name="heart" size={22} />
        </View>
      </View>
      <View>
        <MusicPlayerControls />
      </View>
    </SafeAreaView>
  );
};

export default Index;
