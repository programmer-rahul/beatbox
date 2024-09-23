import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

import { useNavigation } from "expo-router";

const PlayerScreenHeader = () => {
  const { goBack } = useNavigation();
  return (
    <View className="py-2 flex flex-row justify-center items-center border-b border-neutral-300 ">
      <Text className="font-semibold font-spacemono text-primaryText">Now Playing</Text>
    </View>
  );
};

export default PlayerScreenHeader;
