import { View } from "react-native";
import PlayerMusicSlider from "./player-music-slider";
import MusicPlayerControlButtons from "./music-player-control-buttons";
import PlayerSavedMusicIcon from "./player-saved-music-icon";
import AddMusicToPlaylistIcon from "../reusable/icons/add-music-to-playlist-icon";
import RepeatModeIcon from "../reusable/icons/repeat-mode-icon";
import SleepTimerMusicIcon from "../reusable/icons/sleep-timer-music-icon";

const MusicPlayerControls = () => {
  // console.log("INSIDE MUSIC PLAYER CONTROLS");
  return (
    <View className="h-full justify-evenly">
      <View className="flex-row items-center justify-between px-8">
        <View className="flex-row items-center space-x-4">
          <View>
            <RepeatModeIcon size={26} />
          </View>
          <View>
            <AddMusicToPlaylistIcon size={30} />
          </View>
          <View>
            <SleepTimerMusicIcon size={27} />
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
