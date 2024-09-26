import { Text, View } from "react-native";
import PlayerSavedMusicIcon from "./player-saved-music-icon";
import useTrackStore from "@/store/track-store";

const PlayerMusicNameDisplay = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  return (
    <View className="flex-row items-center justify-between px-2">
      <View className="flex-1 pr-4">
        <Text
          className="font-spacemono text-base font-semibold text-primaryText"
          numberOfLines={1}
        >
          {currentMusicTrack?.title}
        </Text>
      </View>
      <PlayerSavedMusicIcon />
    </View>
  );
};

export default PlayerMusicNameDisplay;
