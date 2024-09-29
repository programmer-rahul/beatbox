import { View } from "react-native";
import PlayerAlbumDisplay from "./player-album-display";
import PlayerControls from "./player-controls";
import PlayerMusicNameDisplay from "./player-music-name-display";

function PlayerScreenView() {
  console.log("inside player screen view");
  return (
    <View className="flex-1">
      <View
        className="flex h-3/4 flex-col justify-center"
        style={{ rowGap: 20 }}
      >
        <PlayerAlbumDisplay />
        <PlayerMusicNameDisplay />
      </View>
      <View className="flex-1">
        <PlayerControls />
      </View>
    </View>
  );
}

export default PlayerScreenView;
