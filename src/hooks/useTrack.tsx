import useZustandStore from "@/store/zustand-store";
import { useEffect } from "react";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";

const useTrack = () => {
  const { changeMusic, isMusicPlaying, setIsMusicPlaying } = useZustandStore();

  const { state: playbackState } = usePlaybackState();

  const playTrack = async (trackIndex: number) => {
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
  };

  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };

  const resumeTrack = async () => {
    await TrackPlayer.play();
  };

  const playNextTrack = async (musicId: string) => {
    changeMusic(musicId, 1);
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  };

  const playPreviousTrack = async (musicId: string) => {
    changeMusic(musicId, -1);
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  };

  const onTrackPlayPause = () => {
    setIsMusicPlaying(!isMusicPlaying);
    isMusicPlaying ? pauseTrack() : resumeTrack();
  };

//   useEffect(() => {
//     console.log("changing", Math.random() * 1000);
//     console.log(
//       "changing",
//       TrackPlayer.getPlaybackState().then((yes) => {
//         console.log("yes", yes);
//       })
//     );

//     console.log("playbackStat", playbackState);
//   }, []);

  return {
    playTrack,
    pauseTrack,
    resumeTrack,
    playNextTrack,
    playPreviousTrack,
    onTrackPlayPause,
    TrackPlayer,
    playbackState,
  };
};

export default useTrack;
