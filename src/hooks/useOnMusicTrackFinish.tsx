import { useEffect } from "react";
import { useActiveTrack, useProgress } from "react-native-track-player";
import useZustandStore from "../store/useZustandStore";

const onMusicTrackFinish = () => {
  const currentTrack = useActiveTrack();
  const progress = useProgress();

  const changeCurrentMusicTrack = useZustandStore(
    (state) => state.changeCurrentMusicTrack,
  );

  useEffect(() => {
    const currentMusicTrack = useZustandStore.getState().currentMusicTrack;

    if (progress.position >= progress.duration && currentMusicTrack) {
      console.log("TRACK FINISHED");
      currentMusicTrack?.title !== currentTrack?.title &&
        changeCurrentMusicTrack("next");
    }
  }, [progress]);
};

export default onMusicTrackFinish;
