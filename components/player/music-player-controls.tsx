import { View, Text } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

const MusicPlayerControls = () => {
  return (
    <View className="space-y-10">
      {/* slider */}
      <View className="h-32 border"></View>

      <View className="flex-row gap-4 justify-center items-center">
        <Feather name="skip-back" size={30} />
        <Feather name="play-circle" size={44} />
        <Feather name="skip-forward" size={30} />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
