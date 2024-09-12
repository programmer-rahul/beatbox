import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Header = () => {
  return (
    <View className="px-6 py-1 flex flex-row justify-between items-center">
      <View>
        <Text className="text-3xl font-semibold">BeatBox</Text>
      </View>
      <Text className="text-2xl">Tailwind</Text>
      <View>
        <Feather name="search" size={22} />
      </View>
    </View>
  );
};

export default Header;
