import { useEffect } from "react";
import { useActiveTrack, useProgress } from "react-native-track-player";
import useZustandStore from "../store/useZustandStore";

const onMusicTrackFinish = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const changeCurrentMusicTrack = useZustandStore(
    (state) => state.changeCurrentMusicTrack,
  );

  const currentTrack = useActiveTrack();
  const progress = useProgress();

  // console.log("INSIDE onMusicTrackFinish");

  useEffect(() => {
    if (
      progress.position >= progress.duration &&
      currentMusicTrack &&
      currentTrack
    ) {
      currentMusicTrack?.title !== currentTrack?.title &&
        changeCurrentMusicTrack("next");
    }
  }, [progress]);
};

export default onMusicTrackFinish;
