import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import COLORS from "@/constants/colors";

const Header = () => {
  return (
    <View
      className="flex flex-row items-center justify-between px-4 py-2 pb-4"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <View>
        <Text
          className="font-spacemono text-xl font-semibold"
          style={{ color: COLORS.main }}
        >
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
