import React from "react";
import MiniMusicPlayer from "./mini-music-player";
import useTrackStore from "@/store/track-store";

const RenderMiniMusicPlayer = () => {
  console.log("inside render");
  const { currentMusicTrack } = useTrackStore((state) => ({
    currentMusicTrack: state.currentMusicTrack,
  }));
  return currentMusicTrack ? <MiniMusicPlayer /> : null;
};

export default RenderMiniMusicPlayer;
