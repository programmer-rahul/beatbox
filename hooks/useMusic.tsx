import useZustandStore from "@/store/zustand-store";
import { Audio } from "expo-av";

const useMusic = () => {
  const { currentMusic, setCurrentPosition, addMusicTrack, musicTrack } =
    useZustandStore();

  const playSong = async () => {
    if (!currentMusic) return;
    const { sound } = await Audio.Sound.createAsync(
      { uri: currentMusic.uri },
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          setCurrentPosition(status.positionMillis / 1000);
        }
      }
    );
    addMusicTrack(sound);
  };

  const pauseSong = () => {
    musicTrack?.pauseAsync();
  };

  const resumeSong = () => {
    musicTrack?.playAsync();
  };

  return { playSong, pauseSong, resumeSong };
};

export default useMusic;
