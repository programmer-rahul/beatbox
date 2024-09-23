import COLORS from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

const PlayerAlbumDisplay = () => {
  return (
    <View className="w-11/12 aspect-square rounded-full border-8 border-main/40 bg-main/30 self-center items-center justify-center">
      <Feather name="music" size={180} color={COLORS.main} />
    </View>
  );
};

export default PlayerAlbumDisplay;
