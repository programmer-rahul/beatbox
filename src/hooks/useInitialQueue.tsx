import { useEffect } from "react";
import TrackPlayer, { State } from "react-native-track-player";
import useZustandStore from "../store/useZustandStore";

const useInitialQueue = () => {
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);

  const setCurrentQueue = useZustandStore((state) => state.setCurrentQueue);

  const mountInitialQueue = async () => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    const currentMusicTrack = useZustandStore.getState().currentMusicTrack;

    console.log("----------------------", currentTrackIndex);
    console.log("----------------------", !currentMusicTrack);
    if (!currentMusicTrack) return;

    // check is there music is playing or not for updating ui state
    const { state } = await TrackPlayer.getPlaybackState();
    console.log("setIsTrackPlaying", state);
    setIsTrackPlaying(state === State.Playing ? true : false);

    // to add queue
    if (currentTrackIndex !== undefined) return;
    const allLocalMusicTracks = useZustandStore.getState().allLocalMusicTracks;
    await TrackPlayer.add(allLocalMusicTracks);
    setCurrentQueue({
      type: "home",
      tracksCount: allLocalMusicTracks.length,
    });
    let trackIndex = allLocalMusicTracks.findIndex(
      (localMusicTrack) => localMusicTrack.url === currentMusicTrack.url,
    );

    await TrackPlayer.skip(trackIndex);
  };

  useEffect(() => {
    mountInitialQueue();
  }, []);
};

export default useInitialQueue;
