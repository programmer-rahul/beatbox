import { View, Text } from "react-native";
import COLORS from "./../../constants/colors";
import { Settings } from "lucide-react-native";

const Header = () => {
  return (
    <View
      className="flex flex-row items-center justify-between px-3 py-2 pb-4"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <View>
        <Text
          className="font-sem font-primary_semibold text-3xl"
          style={{ color: COLORS.main }}
        >
          BeatBox
        </Text>
      </View>
      <View>
        <Settings size={20} color={COLORS.secondaryIcon} />
      </View>
    </View>
  );
};

export default Header;
