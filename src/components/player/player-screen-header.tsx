import { Text, View } from "react-native";

const PlayerScreenHeader = () => {
  return (
    <View className="py-2 flex flex-row justify-center items-center border-b border-neutral-300 ">
      <Text className="font-semibold font-spacemono text-primaryText text-xl">
        Now Playing
      </Text>
    </View>
  );
};

export default PlayerScreenHeader;
