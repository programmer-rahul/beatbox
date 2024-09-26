import COLORS from "@/constants/colors";
import { memo } from "react";
import { Text, View } from "react-native";

const PlayerScreenHeader = () => {
  console.log("inside player screen header");
  return (
    <View
      className="flex flex-row items-center justify-center border-b py-2"
      style={{
        borderColor: COLORS.secondaryText,
      }}
    >
      <Text
        className="font-spacemono text-xl font-semibold text-primaryText"
        style={{
          color: COLORS.primaryText,
        }}
      >
        Now Playing
      </Text>
    </View>
  );
};

export default memo(PlayerScreenHeader);
