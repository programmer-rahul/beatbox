import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

import { useNavigation } from "expo-router";

const PlayerScreenHeader = () => {
  const { goBack } = useNavigation();
  return (
    <View className="py-1 flex flex-row justify-between items-center border-b border-neutral-300">
      <Feather
        name="chevron-left"
        size={26}
        onPress={() => {
          goBack();
        }}
      />
      <Entypo name="dots-three-vertical" size={18} />
    </View>
  );
};

export default PlayerScreenHeader;
