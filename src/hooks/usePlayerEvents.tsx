import { Event, useTrackPlayerEvents } from "react-native-track-player";
import useTrackStore, { trackStore } from "@/store/track-store";

const usePlayerEvents = () => {
  const { setIsTrackPlaying, changeCurrentMusicTrack } = useTrackStore([
    "setIsTrackPlaying",
    "changeCurrentMusicTrack",
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
        trackStore.getState().currentMusicTrack &&
          changeCurrentMusicTrack("previous");
      }
      if (event.type === Event.RemoteNext) {
        trackStore.getState().currentMusicTrack &&
          changeCurrentMusicTrack("next");
      }
    },
  );

  // to handle music finish
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if (
      event.lastTrack &&
      event.track &&
      trackStore.getState().currentMusicTrack &&
      !trackStore.getState().isLoopingTrack
    ) {
      if (
        trackStore.getState().currentMusicTrack &&
        event.lastTrack.url !== trackStore.getState().currentMusicTrack?.url
      )
        return;
      changeCurrentMusicTrack("next");
    }
  });
};

export default usePlayerEvents;
