import { View } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import FastImage from "react-native-fast-image";
import LOGO from "../../assets/images/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center space-y-4"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <View className="h-32 w-32 rounded-xl">
        <FastImage
          source={LOGO}
          className="h-full w-full rounded-xl"
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
