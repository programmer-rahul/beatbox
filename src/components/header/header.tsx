import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import COLORS from "@/constants/colors";

const Header = () => {
  return (
    <View className="px-4 py-2 pb-4 flex flex-row justify-between items-center">
      <View>
        <Text className="text-xl font-semibold text-main font-spacemono">
          BeatBox
        </Text>
      </View>
      <View>
        <Feather name="search" size={20} color={COLORS.secondaryIcon} />
      </View>
    </View>
  );
};

export default Header;
