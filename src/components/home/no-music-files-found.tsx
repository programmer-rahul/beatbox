import COLORS from "@/constants/colors";
import { Text, View } from "react-native";

const NoMusicFilesFound = () => {
  return (
    <View className="h-full items-center justify-center">
      <Text
        className="text-center font-primary_semibold text-2xl text-primaryText"
        style={{ color: COLORS.primaryText }}
      >
        No Music Files Found
      </Text>
    </View>
  );
};

export default NoMusicFilesFound;
