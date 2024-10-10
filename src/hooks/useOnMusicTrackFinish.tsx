import { useEffect } from "react";
import { useActiveTrack, useProgress } from "react-native-track-player";
import useZustandStore from "../store/useZustandStore";

const onMusicTrackFinish = () => {
  const currentTrack = useActiveTrack();
  const progress = useProgress();

  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const changeCurrentMusicTrack = useZustandStore(
    (state) => state.changeCurrentMusicTrack,
  );

  console.log("INSIDE onMusicTrackFinish");

  useEffect(() => {
    if (progress.position >= progress.duration && currentMusicTrack) {
      console.log("TRACK FINISHED");
      currentMusicTrack?.title !== currentTrack?.title &&
        changeCurrentMusicTrack("next");
    }
  }, [progress]);
};

export default onMusicTrackFinish;
