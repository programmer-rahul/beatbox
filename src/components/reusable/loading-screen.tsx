import { View, ActivityIndicator } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";

const LoadingScreen = () => {
  return (
    <View
      className="flex-1 items-center justify-center space-y-4"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <ActivityIndicator size={"large"} color={COLORS.main} />
    </View>
  );
};

export default LoadingScreen;
