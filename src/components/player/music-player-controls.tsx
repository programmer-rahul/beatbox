import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlayerMusicSlider from "./player-music-slider";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

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
  } = useTrackStore();

  const onTrackPlayPauseHandler = () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return (
    <View className="space-y-4">
      {/* slider */}
      <PlayerMusicSlider />

      <View className="flex-row items-center justify-center gap-4">
        <MaterialCommunityIcons
          name="repeat-variant"
          size={30}
          color={isLoopingTrack ? COLORS.primaryText : COLORS.secondaryIcon}
          onPress={() => {
            setIsLoopingTrack(!isLoopingTrack);
            TrackPlayer.setRepeatMode(
              isLoopingTrack ? RepeatMode.Queue : RepeatMode.Track,
            );
          }}
        />
        <Feather
          name="skip-back"
          size={30}
          color={COLORS.secondaryIcon}
          onPress={async () => {
            if (!currentMusicTrack) return;
            changeCurrentMusicTrack(currentMusicTrack.url, "previous");
            await TrackPlayer.skipToPrevious();
            await TrackPlayer.play();
          }}
        />
        <Feather
          name={isTrackPlaying ? "pause-circle" : "play-circle"}
          size={70}
          color={isTrackPlaying ? COLORS.main : COLORS.secondaryIcon}
          onPress={onTrackPlayPauseHandler}
        />
        <Feather
          name="skip-forward"
          size={30}
          color={COLORS.secondaryIcon}
          onPress={async () => {
            if (!currentMusicTrack) return;
            changeCurrentMusicTrack(currentMusicTrack.url, "next");
            await TrackPlayer.skipToNext();
            await TrackPlayer.play();
          }}
        />
        <MaterialCommunityIcons
          name="shuffle"
          size={25}
          color={isShufflingQueue ? COLORS.primaryText : COLORS.secondaryIcon}
          onPress={() => setIsShufflingQueue(!isShufflingQueue)}
        />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
