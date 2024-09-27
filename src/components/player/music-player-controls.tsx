import { View } from "react-native";
import PlayerMusicSlider from "./player-music-slider";
import MusicPlayerControlButtons from "./music-player-control-buttons";
import LoopMusicTrackIcon from "../reusable/icons/loop-music-track-icon";
import ShuffleMusicQueueIcon from "../reusable/icons/shuffle-music-queue-icon";
import PlayerSavedMusicIcon from "./player-saved-music-icon";
import AddMusicToPlaylistIcon from "../reusable/icons/add-music-to-playlist-icon";

const MusicPlayerControls = () => {
  console.log("inside music player controls");
  return (
    <View className="h-full justify-evenly">
      <View className="flex-row items-center justify-between px-8">
        <View className="flex-row items-center space-x-4">
          <View>
            <LoopMusicTrackIcon size={40} />
          </View>
          <View>
            <ShuffleMusicQueueIcon size={35} />
          </View>
          <View>
            <AddMusicToPlaylistIcon size={40} />
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          <View>
            <PlayerSavedMusicIcon size={30} />
          </View>
        </View>
      </View>
      <View>
        <PlayerMusicSlider />
      </View>
      <View>
        <MusicPlayerControlButtons />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
