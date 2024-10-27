import { View } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import FastImage from "react-native-fast-image";

const LoadingScreen = () => {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <View className="h-32 w-32 rounded-xl">
        <FastImage
          source={require("../../assets/images/logo.png")}
          className="h-full w-full rounded-xl"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
