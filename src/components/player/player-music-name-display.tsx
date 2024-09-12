import useZustandStore from "@/store/zustand-store";
import { Text, View } from "react-native";
import PlayerSavedMusicIcon from "./player-saved-music-icon";

const PlayerMusicNameDisplay = () => {
  const { currentMusic } = useZustandStore();

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-1 pr-4">
        <Text
          className="text-base font-semibold font-spacemono text-primaryText"
          numberOfLines={1}
        >
          {currentMusic?.filename}
        </Text>
      </View>
      <PlayerSavedMusicIcon />
    </View>
  );
};

export default PlayerMusicNameDisplay;
