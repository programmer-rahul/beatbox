import useOnMusicTrackFinish from "@/hooks/useOnMusicTrackFinish";

function MountOnMusicTrackFinish() {
  console.log("inside mount");
  useOnMusicTrackFinish();

  return null;
}

export default MountOnMusicTrackFinish;
