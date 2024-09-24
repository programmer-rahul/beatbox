import useZustandStore from "@/store/zustand-store";
import { TMusicFile } from "@/types/music";
import { useRouter } from "expo-router";
import useTrack from "./useTrack";

const useMusic = () => {
  const { navigate } = useRouter();
  const { playTrack, TrackPlayer } = useTrack();

  const { currentMusic, setCurrentMusic, allMusicFiles } = useZustandStore();

  const onMusicFilePress = async (musicFile: TMusicFile) => {
    setCurrentMusic(musicFile);

    // resume current song
    if (currentMusic?.id === musicFile.id) {
    }
    // start new song
    else {
      await TrackPlayer.reset();
      const homeTracks = allMusicFiles.map((musicFile) => ({
        url: musicFile.uri,
        title: musicFile.filename,
        duration: musicFile.duration,
      }));
      console.log("homeTracks : ", homeTracks);

      await TrackPlayer.add(homeTracks);

      const currentMusicTrackIndex = allMusicFiles.findIndex(
        (music) => music.uri === musicFile.uri
      );

      // start playing song
      playTrack(currentMusicTrackIndex).then(() => {
        // change route
        navigate("/player");
      });
    }
  };

  return {
    onMusicFilePress,
  };
};

export default useMusic;
