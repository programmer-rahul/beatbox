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
  // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
  //   const currentMusicTrack = trackStore.getState().currentMusicTrack;
  //   const isLoopingTrack = trackStore.getState().isLoopingTrack;

  //   if (isLoopingTrack) return;
  //   if (
  //     event.lastTrack &&
  //     event.track &&
  //     currentMusicTrack &&
  //     event.lastTrack.url !== currentMusicTrack?.url
  //   ) {
  //     console.log("currentTrack : ", currentMusicTrack);
  //     console.log("event : ", event);
  //     return changeCurrentMusicTrack("next");
  //   }
  // });
};

export default usePlayerEvents;
