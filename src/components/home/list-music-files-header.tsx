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
    <View className="flex flex-row items-center justify-between pb-1 pl-1 pr-2">
      <Text
        className="font-primary_regular text-xl text-primaryText"
        style={{
          color: COLORS.primaryText + "dd",
        }}
      >
        {heading}
      </Text>
      <Text
        className="font-primary_regular text-base text-secondaryText"
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
