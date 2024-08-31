import { View, Text } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomRangeSlider from "../reusable/custom-range-slider";

const MusicPlayerControls = () => {
  return (
    <View className="space-y-10">
      {/* slider */}
      <View>
        <CustomRangeSlider />
        <View className="px-4 flex-row justify-between">
          <Text className="text-xs text-neutral-500">0:00</Text>
          <Text className="text-xs text-neutral-500 text-right">3:00</Text>
        </View>
      </View>

      <View className="flex-row gap-4 justify-center items-center">
        <Feather name="skip-back" size={30} />
        <Feather name="play-circle" size={44} />
        <Feather name="skip-forward" size={30} />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
