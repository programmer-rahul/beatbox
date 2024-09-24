import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import useZustandStore from "@/store/zustand-store";
import useMusic from "@/hooks/useMusic";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlayerMusicSlider from "./player-music-slider";
import COLORS from "@/constants/colors";
import useTrack from "@/hooks/useTrack";

const MusicPlayerControls = () => {
  const {
    isLooping,
    isShuffling,
    setIsLooping,
    setIsShuffling,
    currentMusic,
  } = useZustandStore();

  const { onTrackPlayPause, playNextTrack, playPreviousTrack, playbackState } =
    useTrack();

  return (
    <View className="space-y-4">
      {/* slider */}
      <PlayerMusicSlider duration={currentMusic?.duration ?? 0} />

      <View className="flex-row gap-4 justify-center items-center">
        <MaterialCommunityIcons
          name="repeat-variant"
          size={30}
          color={isLooping ? COLORS.primaryText : COLORS.secondaryIcon}
          onPress={() => setIsLooping(!isLooping)}
        />
        <Feather
          name="skip-back"
          size={30}
          color={COLORS.secondaryIcon}
          onPress={() => {
            if (!currentMusic) return;
            playPreviousTrack(currentMusic.id);
          }}
        />
        <Feather
          name={playbackState === "playing" ? "pause-circle" : "play-circle"}
          size={70}
          color={
            playbackState === "playing" ? COLORS.main : COLORS.secondaryIcon
          }
          onPress={onTrackPlayPause}
        />
        <Feather
          name="skip-forward"
          size={30}
          color={COLORS.secondaryIcon}
          onPress={() => {
            if (!currentMusic) return;
            playNextTrack(currentMusic.id);
          }}
        />
        <MaterialCommunityIcons
          name="shuffle"
          size={25}
          color={isShuffling ? COLORS.primaryText : COLORS.secondaryIcon}
          onPress={() => setIsShuffling(!isShuffling)}
        />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
