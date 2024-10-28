import { View, Text } from "react-native";
import COLORS from "./../../constants/colors";
import { Settings } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

const Header = () => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  return (
    <View
      className="flex flex-row items-center justify-between px-3 py-3"
      style={{
        backgroundColor: isFocused ? COLORS.main + "88" : COLORS.primaryBg,
        paddingTop: insets.top,
      }}
    >
      <View>
        <Text
          className="font-sem font-primary_semibold text-3xl"
          style={{ color: COLORS.primaryText }}
        >
          BeatBox
        </Text>
      </View>
      <View>
        <Settings size={20} color={COLORS.primaryText} />
      </View>
    </View>
  );
};

export default Header;
