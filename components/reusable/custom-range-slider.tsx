import { View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const CustomRangeSlider = ({
  totalMusicDuration,
}: {
  totalMusicDuration: number;
}) => {
  return (
    <View>
      <Slider
        minimumValue={1}
        maximumValue={Math.floor(totalMusicDuration)}
        onValueChange={(value) => {
          console.log("changed", value);
        }}
        thumbTintColor="#65a30d"
        minimumTrackTintColor="#65a30d"
      />
    </View>
  );
};

export default CustomRangeSlider;
