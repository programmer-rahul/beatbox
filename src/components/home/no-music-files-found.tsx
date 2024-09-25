import { Text, View } from "react-native";

const NoMusicFilesFound = () => {
  return (
    <View className="justify-center items-center h-full">
      <Text className="text-2xl font-semibold text-primaryText font-spacemono text-center">
        No Music Files Found
      </Text>
    </View>
  );
};

export default NoMusicFilesFound;
