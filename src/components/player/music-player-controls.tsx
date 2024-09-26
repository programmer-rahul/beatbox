import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlayerMusicSlider from "./player-music-slider";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import PlayPreviusNextMusicIcon from "../reusable/icons/play-previus-next-music-icon";
import PlayPauseMusicIcon from "../reusable/icons/play-pause-music-icon";
import LoppMusicTrackIcon from "../reusable/icons/loop-music-track-icon";
import ShuffleMusicQueueIcon from "../reusable/icons/shuffle-music-queue-icon copy";

const MusicPlayerControls = () => {
  const {
    currentMusicTrack,
    changeCurrentMusicTrack,
    isLoopingTrack,
    setIsLoopingTrack,
    isShufflingQueue,
    setIsShufflingQueue,
    isTrackPlaying,
    setIsTrackPlaying,
  } = useTrackStore([
    "currentMusicTrack",
    "changeCurrentMusicTrack",
    "isLoopingTrack",
    "setIsLoopingTrack",
    "isShufflingQueue",
    "setIsShufflingQueue",
    "isTrackPlaying",
    "setIsTrackPlaying",
  ]);

  const onTrackPlayPauseHandler = () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return (
    <View className="space-y-4">
      {/* slider */}
      <PlayerMusicSlider />

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
    </View>
  );
};

export default MusicPlayerControls;
