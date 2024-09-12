import { Text, View } from "react-native";

const NoMusicFilesFound = () => {
  return (
    <View className="justify-center items-center h-full bg-primaryBg">
      <Text className="text-4xl font-semibold text-primaryText">No Music Files Found</Text>
    </View>
  );
};

export default NoMusicFilesFound;
