import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";

const ScanningMusicFiles = () => {
  return (
    <View
      className="flex-1 items-center justify-center space-y-4"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <Text className="text-2xl" style={{ color: COLORS.primaryText }}>
        Scanning Music Files
      </Text>
      <ActivityIndicator size={"large"} color={COLORS.main} />
    </View>
  );
};

export default ScanningMusicFiles;
