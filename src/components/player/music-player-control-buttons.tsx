import { memo } from "react";
import PlayPreviusNextMusicIcon from "../reusable/icons/play-previus-next-music-icon";
import PlayPauseMusicIcon from "../reusable/icons/play-pause-music-icon";
import LoppMusicTrackIcon from "../reusable/icons/loop-music-track-icon";
import ShuffleMusicQueueIcon from "../reusable/icons/shuffle-music-queue-icon";
import { View } from "react-native";

function MusicPlayerControlButtons() {
  console.log("inside music player control buttons");
  return (
    <View className="flex-row items-center justify-center gap-4">
      <View>
        <LoppMusicTrackIcon />
      </View>
      <View>
        <PlayPreviusNextMusicIcon type="previous" size={30} />
      </View>
      <View>
        <PlayPauseMusicIcon size={70} />
      </View>
      <View>
        <PlayPreviusNextMusicIcon type="next" size={30} />
      </View>

      <View>
        <ShuffleMusicQueueIcon />
      </View>
    </View>
  );
}

export default memo(MusicPlayerControlButtons);
