import COLORS from "./../../constants/colors";
import { Text, View } from "react-native";

function ListMusicFilesHeader({
  heading,
  musicFilesLength,
}: {
  heading: string;
  musicFilesLength: number;
}) {
  return (
    <View className="flex flex-row items-center justify-between px-2 pr-1 mt-2">
      <Text
        className="font-primary_regular text-base text-primaryText"
        style={{
          color: COLORS.primaryText + "dd",
        }}
      >
        {heading}
      </Text>
      <Text
        className="font-primary_regular text-sm text-secondaryText"
        style={{
          color: COLORS.secondaryText,
        }}
      >
        {musicFilesLength}
      </Text>
    </View>
  );
}

export default ListMusicFilesHeader;
