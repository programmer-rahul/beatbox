import { View, Text, Pressable } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import useZustandStore from "@/store/zustand-store";

const MusicPlayerControls = ({
  duration,
  musicId,
}: {
  duration: number;
  musicId: string;
}) => {
  const { changeMusic } = useZustandStore();
  return (
    <View className="space-y-10">
      {/* slider */}
      <View>
        <CustomRangeSlider />
        <View className="px-4 flex-row justify-between">
          <Text className="text-xs text-neutral-500">0:00</Text>
          <Text className="text-xs text-neutral-500 text-right">
            {formatMusicFileDuration(duration)}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 justify-center items-center">
        <Pressable
          onPress={() => {
            changeMusic(musicId, -1);
          }}
        >
          <Feather name="skip-back" size={30} />
        </Pressable>
        <Feather name="play-circle" size={44} />

        <Pressable
          onPress={() => {
            changeMusic(musicId, 1);
          }}
        >
          <Feather name="skip-forward" size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default MusicPlayerControls;
