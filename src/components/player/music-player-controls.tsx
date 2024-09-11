import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import useZustandStore from "@/store/zustand-store";
import useMusic from "@/hooks/useMusic";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlayerMusicSlider from "./player-music-slider";

const MusicPlayerControls = ({
  duration,
  musicId,
}: {
  duration: number;
  musicId: string;
}) => {
  const {
    isMusicPlaying,
    isLooping,
    isShuffling,
    setIsLooping,
    setIsShuffling,
  } = useZustandStore();

  const { onMusicPlayPause, playPreviousOrNextSong } = useMusic();

  return (
    <View className="space-y-10">
      {/* slider */}
      <PlayerMusicSlider duration={duration} />

      <View className="flex-row gap-4 justify-center items-center">
        <MaterialCommunityIcons
          name="repeat-variant"
          size={30}
          color={isLooping ? "#65a30d" : "#292929"}
          onPress={() => setIsLooping(!isLooping)}
        />
        <Feather
          name="skip-back"
          size={30}
          color="#292929"
          onPress={() => playPreviousOrNextSong(-1, musicId)}
        />
        <Feather
          name={isMusicPlaying ? "pause-circle" : "play-circle"}
          size={44}
          color="#292929"
          onPress={onMusicPlayPause}
        />
        <Feather
          name="skip-forward"
          size={30}
          color="#292929"
          onPress={() => playPreviousOrNextSong(1, musicId)}
        />
        <MaterialCommunityIcons
          name="shuffle"
          size={30}
          color={isShuffling ? "#65a30d" : "#292929"}
          onPress={() => setIsShuffling(!isShuffling)}
        />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
