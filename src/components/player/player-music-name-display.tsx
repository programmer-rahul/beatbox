import { Text, View } from "react-native";
import PlayerSavedMusicIcon from "./player-saved-music-icon";
import trackStore from "@/store/track-store";

const PlayerMusicNameDisplay = () => {
  const { currentMusicTrack } = trackStore();

  return (
    <View className="flex-row justify-between items-center px-2">
      <View className="flex-1 pr-4">
        <Text
          className="text-base font-semibold font-spacemono text-primaryText"
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
