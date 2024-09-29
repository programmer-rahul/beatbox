import { Text, View } from "react-native";
import useTrackStore from "@/store/track-store";
import COLORS from "@/constants/colors";

const PlayerMusicNameDisplay = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  return (
    <View className="flex justify-between px-2">
      <Text
        className="font-primary_semibold text-base text-primaryBg"
        numberOfLines={1}
        style={{
          color: COLORS.primaryBg,
        }}
      >
        {currentMusicTrack?.title}
      </Text>
      <Text
        className="text-center font-primary_regular text-sm text-secondaryText"
        numberOfLines={1}
        style={{
          color: COLORS.secondaryText,
        }}
      >
        {currentMusicTrack?.album}
      </Text>
    </View>
  );
};

export default PlayerMusicNameDisplay;
