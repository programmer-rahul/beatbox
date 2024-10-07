import { Event, useTrackPlayerEvents } from "react-native-track-player";
import useZustandStore from "../store/useZustandStore";

const usePlayerEvents = () => {
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);
  const changeCurrentMusicTrack = useZustandStore(
    (state) => state.changeCurrentMusicTrack,
  );

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
        useZustandStore.getState().currentMusicTrack &&
          changeCurrentMusicTrack("previous");
      }
      if (event.type === Event.RemoteNext) {
        useZustandStore.getState().currentMusicTrack &&
          changeCurrentMusicTrack("next");
      }
    },
  );

  // to handle music finish
  // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
  //   const currentMusicTrack = useZustandStore.getState().currentMusicTrack;
  //   const isLoopingTrack = useZustandStore.getState().isLoopingTrack;

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
