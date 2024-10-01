import { useEffect } from "react";
import { useActiveTrack, useProgress } from "react-native-track-player";
import useTrackStore, { trackStore } from "@/store/track-store";

const onMusicTrackFinish = () => {
  const currentTrack = useActiveTrack();
  const progress = useProgress();
  const { changeCurrentMusicTrack } = useTrackStore([
    "changeCurrentMusicTrack",
  ]);

  useEffect(() => {
    // console.log("position", progress.position);
    // console.log("duration", progress.duration);
    // console.log("currentTrack", currentTrack?.title);
    // console.log("currentMusicTrack", currentMusicTrack?.title);

    const currentMusicTrack = trackStore.getState().currentMusicTrack;

    if (progress.position >= progress.duration && currentMusicTrack) {
      console.log("inside here");
      currentMusicTrack?.title !== currentTrack?.title &&
        changeCurrentMusicTrack("next");
    }
  }, [progress]);
};

export default onMusicTrackFinish;
