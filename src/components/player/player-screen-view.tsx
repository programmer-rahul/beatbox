import React from "react";
import { View } from "react-native";
import PlayerAlbumDisplay from "./player-album-display";
import PlayerControls from "./player-controls";
import PlayerMusicNameDisplay from "./player-music-name-display";

function PlayerScreenView() {
  return (
    <View className="flex-1">
      <View
        className="flex h-3/4 flex-col justify-center"
        style={{ rowGap: 20 }}
      >
        <PlayerAlbumDisplay />
        <PlayerMusicNameDisplay />
      </View>
      <View>
        <PlayerControls />
      </View>
    </View>
  );
}

export default PlayerScreenView;
