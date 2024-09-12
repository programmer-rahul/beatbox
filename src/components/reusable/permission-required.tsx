import { Text, View } from "react-native";

const PermissionRequired = () => {
  return (
    <View className="h-full justify-center items-center bg-primaryBg">
      <Text className="text-4xl font-semibold text-primaryText">
        Permissions Required
      </Text>
      <Text className="text-xl text-center text-secondaryText">
        We need access to your media library to display your Music files.
      </Text>
    </View>
  );
};
export default PermissionRequired;
