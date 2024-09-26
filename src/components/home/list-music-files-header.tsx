import { Text, View } from "react-native";

function ListMusicFilesHeader({
  heading,
  musicFilesLength,
}: {
  heading: string;
  musicFilesLength: number;
}) {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="font-spacemono text-xs font-bold text-primaryText">
        {heading}
      </Text>
      <Text className="font-spacemono text-xs font-bold text-secondaryText">
        {musicFilesLength}
      </Text>
    </View>
  );
}

export default ListMusicFilesHeader;
