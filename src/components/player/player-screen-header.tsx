import { Text, View } from "react-native";

const PlayerScreenHeader = () => {
  return (
    <View className="flex flex-row items-center justify-center border-b border-neutral-300 py-2">
      <Text className="font-spacemono text-xl font-semibold text-primaryText">
        Now Playing
      </Text>
    </View>
  );
};

export default PlayerScreenHeader;
