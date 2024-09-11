import { Text, View } from "react-native";

const PermissionRequired = () => {
  return (
    <View className="h-full justify-center items-center">
      <Text className="text-4xl font-semibold">Permissions Required</Text>
      <Text className="text-xl text-center text-neutral-800">
        We need access to your media library to display your Music files.
      </Text>
    </View>
  );
};
export default PermissionRequired;
