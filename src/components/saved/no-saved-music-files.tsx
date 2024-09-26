import COLORS from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoSavedMusicFiles = () => {
  return (
    <View className="flex-1 flex-row items-center justify-center gap-2">
      <Text className="font-spacemono text-2xl font-semibold text-primaryText">
        No Saved Music Files
      </Text>
      <View className="absolute -z-10 pt-8 opacity-10">
        <AntDesign name="hearto" size={380} color={COLORS.main} />
      </View>
    </View>
  );
};
export default NoSavedMusicFiles;
