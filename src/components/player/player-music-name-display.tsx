import { Text, View } from "react-native";
import PlayerSavedMusicIcon from "./player-saved-music-icon";
import useTrack from "@/hooks/useTrack";

const PlayerMusicNameDisplay = () => {
  const { activeTrack } = useTrack();

  return (
    <View className="flex-row justify-between items-center px-4">
      <View className="flex-1 pr-4">
        <Text
          className="text-base font-semibold font-spacemono text-primaryText"
          numberOfLines={1}
        >
          {activeTrack?.title}
        </Text>
      </View>
      <PlayerSavedMusicIcon />
    </View>
  );
};

export default PlayerMusicNameDisplay;
