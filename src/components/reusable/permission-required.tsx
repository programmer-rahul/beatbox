import COLORS from "./../../constants/colors";
import { Text, View } from "react-native";

const PermissionRequired = () => {
  return (
    <View
      className="h-full items-center justify-center bg-primaryBg"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <Text
        className="text-2xl font-semibold text-primaryText"
        style={{
          color: COLORS.primaryText,
        }}
      >
        Permissions Required
      </Text>
      <Text
        className="text-center text-xl text-secondaryText"
        style={{
          color: COLORS.secondaryText,
        }}
      >
        We need access to your media library to display your Music files.
      </Text>
    </View>
  );
};
export default PermissionRequired;
