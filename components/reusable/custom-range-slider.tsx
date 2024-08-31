import { View, Text } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const CustomRangeSlider = () => {
  return (
    <View>
      <Slider minimumValue={1} maximumValue={100} />
    </View>
  );
};

export default CustomRangeSlider;
