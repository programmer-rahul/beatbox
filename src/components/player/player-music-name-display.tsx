import { Text, View } from "react-native";
import COLORS from "./../../constants/colors";
import MusicFileTitle from "../reusable/music-file-title";
import useZustandStore from "../../store/useZustandStore";

const PlayerMusicNameDisplay = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  return (
    <View className="flex justify-between px-4">
      <MusicFileTitle text="big" />
      <Text
        className="text-start font-primary_regular text-sm text-secondaryText"
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
