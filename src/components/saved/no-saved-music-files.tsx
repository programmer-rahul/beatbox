import COLORS from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoSavedMusicFiles = () => {
  return (
    <View className="flex-row gap-2 items-center justify-center flex-1">
      <Text className="text-2xl font-semibold font-spacemono text-primaryText">
        No Saved Music Files
      </Text>
      <View className="absolute opacity-10 -z-10 pt-8">
        <AntDesign name="hearto" size={380} color={COLORS.main} />
      </View>
    </View>
  );
};
export default NoSavedMusicFiles;
