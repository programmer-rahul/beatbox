import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

const PlayerAlbumDisplay = () => {
  return (
    <View className="w-4/5 aspect-square rounded-full border border-lime-300 bg-lime-200/20 self-center my-10 items-center justify-center">
      <Feather name="music" size={180} color="#65a30d" />
    </View>
  );
};

export default PlayerAlbumDisplay;
