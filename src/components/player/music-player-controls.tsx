import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import useZustandStore from "@/store/zustand-store";
import useMusic from "@/hooks/useMusic";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlayerMusicSlider from "./player-music-slider";
import COLORS from "@/constants/colors";

const MusicPlayerControls = () => {
  const {
    isMusicPlaying,
    isLooping,
    isShuffling,
    setIsLooping,
    setIsShuffling,
    currentMusic,
  } = useZustandStore();

  const { onMusicPlayPause, playPreviousOrNextSong } = useMusic();

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
            playPreviousOrNextSong(-1, currentMusic.id);
          }}
        />
        <Feather
          name={isMusicPlaying ? "pause-circle" : "play-circle"}
          size={70}
          color={isMusicPlaying ? COLORS.main : COLORS.primaryIcon}
          onPress={onMusicPlayPause}
        />
        <Feather
          name="skip-forward"
          size={30}
          color={COLORS.secondaryIcon}
          onPress={() => {
            if (!currentMusic) return;
            playPreviousOrNextSong(1, currentMusic.id);
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
