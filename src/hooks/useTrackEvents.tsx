import useZustandStore from "@/store/zustand-store";
import { Event, useTrackPlayerEvents } from "react-native-track-player";

const useTrackEvents = () => {
  const { currentMusic, changeMusic } = useZustandStore();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    console.log("-------------------------");
    console.log("lastTrack   : ", event.lastTrack);
    console.log("track : ", event.track);
    console.log("currentMusic : ", currentMusic?.uri);
    console.log("-------------------------");

    // if (event.track && event.lastTrack && currentMusic) {
    //   // if song is finished
    //   if (event.lastTrack.url === currentMusic.uri) {
    //     console.log("finished");
    //     changeMusic(currentMusic.id, 1);
    //   }
    // }
  });
};

export default useTrackEvents;
