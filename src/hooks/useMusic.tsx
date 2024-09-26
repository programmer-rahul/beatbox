import useQueueStore from "@/store/queue-store";
import useTrackStore from "@/store/track-store";
import { TMusicTrack } from "@/types/store/track-store";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import TrackPlayer from "react-native-track-player";

const useMusic = () => {
  const {
    allLocalMusicTracks,
    currentMusicTrack,
    setCurrentMusicTrack,
    setIsTrackPlaying,
  } = useTrackStore([
    "allLocalMusicTracks",
    "currentMusicTrack",
    "setCurrentMusicTrack",
    "setIsTrackPlaying",
  ]);
  const { currentQueue, setCurrentQueue } = useQueueStore([
    "currentQueue",
    "setCurrentQueue",
  ]);

  const { navigate } = useRouter();

  const onMusicFilePress = useCallback(async (musicFile: TMusicTrack) => {
    setCurrentMusicTrack(musicFile);

    if (currentMusicTrack?.url !== musicFile.url) {
      if (!currentQueue.tracksCount) {
        await TrackPlayer.reset();
        await TrackPlayer.add(allLocalMusicTracks);

        setCurrentQueue({
          type: "home",
          tracksCount: allLocalMusicTracks.length,
        });
      }

      let trackIndex = allLocalMusicTracks.findIndex(
        (localMusicTrack) => localMusicTrack.url === musicFile.url,
      );

      await TrackPlayer.skip(trackIndex);
      await TrackPlayer.play();

      setIsTrackPlaying(true);
    } else {
      navigate("/player");
    }
  }, []);

  return { onMusicFilePress };
};

export default useMusic;
