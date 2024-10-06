import { Heart } from "lucide-react-native";
import COLORS from "./../../constants/colors";
// import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoSavedMusicFiles = () => {
  return (
    <View className="flex-1 flex-row items-center justify-center gap-2">
      <Text
        className="font-primary_semibold text-2xl text-primaryText"
        style={{
          color: COLORS.primaryText,
        }}
      >
        No Saved Music Files
      </Text>
      <View className="absolute -z-10 pt-8 opacity-10">
        <Heart size={240} color={COLORS.main} strokeWidth={1} />
      </View>
    </View>
  );
};
export default NoSavedMusicFiles;
