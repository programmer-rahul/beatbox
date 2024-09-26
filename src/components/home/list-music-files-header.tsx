import COLORS from "@/constants/colors";
import { Text, View } from "react-native";

function ListMusicFilesHeader({
  heading,
  musicFilesLength,
}: {
  heading: string;
  musicFilesLength: number;
}) {
  return (
    <View className="flex flex-row items-center justify-between px-2">
      <Text
        className="font-spacemono text-xs font-bold text-primaryText"
        style={{
          color: COLORS.primaryText,
        }}
      >
        {heading}
      </Text>
      <Text
        className="font-spacemono text-xs font-bold text-secondaryText"
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
