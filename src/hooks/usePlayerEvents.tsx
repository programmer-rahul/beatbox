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
};

export default usePlayerEvents;
