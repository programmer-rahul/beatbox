import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Saved = () => {
  return (
    <View className="h-full">
      <Text>Saved</Text>  
      <Link href={"/player"}>Player</Link>
    </View>
  );
};

export default Saved;
