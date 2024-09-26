import COLORS from "@/constants/colors";
import { Text, View } from "react-native";

const NoMusicFilesFound = () => {
  return (
    <View className="h-full items-center justify-center">
      <Text
        className="text-center font-spacemono text-2xl font-semibold text-primaryText"
        style={{ color: COLORS.primaryText }}
      >
        No Music Files Found
      </Text>
    </View>
  );
};

export default NoMusicFilesFound;
