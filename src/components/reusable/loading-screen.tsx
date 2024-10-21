import { View, ActivityIndicator } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import LOGO from "../../assets/images/logo.png";
import FastImage from "react-native-fast-image";

const LoadingScreen = () => {
  return (
    <View
      className="flex-1 items-center justify-center space-y-4"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <View className="h-32 w-32">
        <FastImage source={LOGO} className="h-full w-full" />
      </View>
      <ActivityIndicator size={"large"} color={COLORS.main} />
    </View>
  );
};

export default LoadingScreen;
