import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from "react-native-track-player";
import useTrackStore from "@/store/track-store";

const usePlayerEvents = () => {
  const {
    setIsTrackPlaying,
    currentMusicTrack,
    changeCurrentMusicTrack,
    isLoopingTrack,
  } = useTrackStore([
    "setIsTrackPlaying",
    "currentMusicTrack",
    "changeCurrentMusicTrack",
    "isLoopingTrack",
  ]);

  // to handle events from notification
  useTrackPlayerEvents(
    [
      Event.RemotePlay,
      Event.RemotePause,
      Event.RemoteStop,
      Event.RemotePrevious,
      Event.RemoteNext,
    ],
    (event) => {
      if (event.type === Event.RemotePlay) setIsTrackPlaying(true);
      if (event.type === Event.RemotePause) setIsTrackPlaying(false);
      if (event.type === Event.RemotePrevious) {
        currentMusicTrack &&
          changeCurrentMusicTrack(currentMusicTrack.url, "previous");
      }
      if (event.type === Event.RemoteNext) {
        currentMusicTrack &&
          changeCurrentMusicTrack(currentMusicTrack.url, "next");
      }
    },
  );

  // to handle music finish
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if (
      event.lastTrack &&
      event.track &&
      currentMusicTrack &&
      !isLoopingTrack
    ) {
      if (event.lastTrack.url !== currentMusicTrack.url) return;
      changeCurrentMusicTrack(currentMusicTrack.url, "next");
    }
  });
};

export default usePlayerEvents;
