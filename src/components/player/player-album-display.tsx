import COLORS from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

const PlayerAlbumDisplay = () => {
  return (
    <View className="w-4/5 aspect-square rounded-full border-2 border-main bg-main/20 self-center my-10 items-center justify-center">
      <Feather name="music" size={180} color={COLORS.main} />
    </View>
  );
};

export default PlayerAlbumDisplay;
