import PlayPreviusNextMusicIcon from "../reusable/icons/play-previus-next-music-icon";
import PlayPauseMusicIcon from "../reusable/icons/play-pause-music-icon";
import { View } from "react-native";
import PlayForwardMusicIcon from "../reusable/icons/play-forward-music-icon";
import PlayBackwardMusicIcon from "../reusable/icons/play-backward-music-icon";

function MusicPlayerControlButtons() {
  // console.log("inside music player control buttons");
  return (
    <View className="flex-row items-center justify-evenly px-2">
      <View>
        <PlayPreviusNextMusicIcon type="previous" size={40} />
      </View>
      <View>
        <PlayBackwardMusicIcon size={40} />
      </View>
      <View>
        <PlayPauseMusicIcon size={55} />
      </View>
      <View>
        <PlayForwardMusicIcon size={40} />
      </View>
      <View>
        <PlayPreviusNextMusicIcon type="next" size={40} />
      </View>
    </View>
  );
}

export default MusicPlayerControlButtons;
