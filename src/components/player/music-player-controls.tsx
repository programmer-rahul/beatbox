import { View } from "react-native";
import PlayerMusicSlider from "./player-music-slider";
import MusicPlayerControlButtons from "./music-player-control-buttons";

const MusicPlayerControls = () => {
  console.log("inside music player controls");
  return (
    <View>
      <PlayerMusicSlider />
      <MusicPlayerControlButtons />
    </View>
  );
};

export default MusicPlayerControls;
