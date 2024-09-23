import COLORS from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoSavedMusicFiles = () => {
  return (
    <View className="flex-row gap-2 items-center justify-center h-full">
      <Text className="text-2xl font-semibold">No Saved Music Files</Text>
      <AntDesign name="hearto" size={30} color={COLORS.main} />
    </View>
  );
};
export default NoSavedMusicFiles;
