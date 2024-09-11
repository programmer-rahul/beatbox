import { Text, View } from "react-native";

const NoMusicFilesFound = () => {
  return (
    <View className="justify-center items-center h-full">
      <Text className="text-4xl font-semibold">No Music Files Found</Text>
    </View>
  );
};

export default NoMusicFilesFound;
