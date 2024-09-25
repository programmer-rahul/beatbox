import useZustandStore from "@/store/zustand-store";
import { useEffect, useState } from "react";
import TrackPlayer, {
  Event,
  useActiveTrack,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";

const useTrack = () => {
  const { changeMusic, isMusicPlaying, setIsMusicPlaying } = useZustandStore();

  const [trackTitle, setTrackTitle] = useState("");

  const { state: playbackState } = usePlaybackState();
  const progress = useProgress();

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
    // changeMusic(musicId, 1);
    // await TrackPlayer.skipToNext();
    // await TrackPlayer.play();

    
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

  const isTrackPlaying = () => {
    if (
      playbackState === "playing" ||
      playbackState === "ready" ||
      playbackState === "buffering" ||
      playbackState === "loading"
    )
      return true;
    else return false;
  };

  const activeTrack = useActiveTrack();

  return {
    playTrack,
    pauseTrack,
    resumeTrack,
    playNextTrack,
    playPreviousTrack,
    onTrackPlayPause,
    TrackPlayer,
    playbackState,
    isTrackPlaying,
    activeTrack,
    progress,
  };
};

export default useTrack;
