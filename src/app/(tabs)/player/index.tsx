import { View } from "react-native";
import PlayerScreenHeader from "@/components/player/player-screen-header";
import PlayerControls from "@/components/player/player-controls";
import PlayerAlbumDisplay from "@/components/player/player-album-display";
import PlayerMusicNameDisplay from "@/components/player/player-music-name-display";

const PlayerScreen = () => {
  return (
    <View className="px-4 space-y-10 bg-green-500 flex-1">
      <PlayerScreenHeader />

      <View>
        <PlayerAlbumDisplay />
        <PlayerMusicNameDisplay />
      </View>

      <PlayerControls />
    </View>
  );
};

export default PlayerScreen;
