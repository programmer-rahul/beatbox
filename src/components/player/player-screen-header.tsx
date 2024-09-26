import { memo } from "react";
import { Text, View } from "react-native";

const PlayerScreenHeader = () => {
  console.log("inside player screen header");
  return (
    <View className="flex flex-row items-center justify-center border-b border-neutral-300 py-2">
      <Text className="font-spacemono text-xl font-semibold text-primaryText">
        Now Playing
      </Text>
    </View>
  );
};

export default memo(PlayerScreenHeader);
