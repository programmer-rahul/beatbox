import { Text, View } from "react-native";
import useTrackStore from "@/store/track-store";
import COLORS from "@/constants/colors";

const PlayerMusicNameDisplay = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  return (
    <View className="flex justify-between px-2">
      <Text
        className="font-spacemono text-base font-semibold text-primaryBg"
        numberOfLines={1}
        style={{
          color: COLORS.primaryBg,
        }}
      >
        {currentMusicTrack?.title}
      </Text>
      <Text
        className="text-center font-spacemono text-sm font-semibold text-secondaryText"
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
