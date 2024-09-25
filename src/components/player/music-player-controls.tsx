import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlayerMusicSlider from "./player-music-slider";
import COLORS from "@/constants/colors";
import useTrack from "@/hooks/useTrack";
import useTrackStore from "@/store/track-store";
import TrackPlayer from "react-native-track-player";
import { useEffect, useState } from "react";

const MusicPlayerControls = () => {
  const { isTrackPlaying, playPreviousTrack, playNextTrack } = useTrack();

  const {
    currentMusicTrack,
    changeCurrentMusicTrack,
    isLoopingTrack,
    setIsLoopingTrack,
    isShufflingQueue,
    setIsShufflingQueue,
  } = useTrackStore();

  const onTrackPlayPauseHandler = () => {
    isTrackPlaying() ? TrackPlayer.pause() : TrackPlayer.play();
  };

  useEffect(() => {
    console.log("inside controls");
  });

  return (
    <View className="space-y-4">
      {/* slider */}
      <PlayerMusicSlider />

      <View className="flex-row gap-4 justify-center items-center">
        <MaterialCommunityIcons
          name="repeat-variant"
          size={30}
          color={isLoopingTrack ? COLORS.primaryText : COLORS.secondaryIcon}
          onPress={() => setIsLoopingTrack(!isLoopingTrack)}
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
          name={isTrackPlaying() ? "pause-circle" : "play-circle"}
          size={70}
          color={isTrackPlaying() ? COLORS.main : COLORS.secondaryIcon}
          onPress={onTrackPlayPauseHandler}
        />
        <Feather
          name="skip-forward"
          size={30}
          color={COLORS.secondaryIcon}
          onPress={() => playNextTrack}
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
