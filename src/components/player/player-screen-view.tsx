import { View } from "react-native";
import PlayerControls from "./player-controls";
import PlayerMusicNameDisplay from "./player-music-name-display";
import MusicFileAlbumDisplayOnTrackChange from "../reusable/music-file-album-display-on-trackchange";

function PlayerScreenView() {
  console.log("INSIDE PLAYER VIEW");
  return (
    <View className="flex-1">
      <View
        className="flex h-3/4 flex-col justify-center"
        style={{ rowGap: 20 }}
      >
        <MusicFileAlbumDisplayOnTrackChange size="big" />
        <PlayerMusicNameDisplay />
      </View>
      <View className="flex-1">
        <PlayerControls />
      </View>
    </View>
  );
}

export default PlayerScreenView;
