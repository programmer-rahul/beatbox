import useZustandStore from "@/store/zustand-store";
import { Audio, AVPlaybackStatus } from "expo-av";
import { useEffect, useState } from "react";

const useMusic = () => {
  const {
    currentMusic,
    setCurrentPosition,
    addMusicTrack,
    musicTrack,
    clearMusicTrack,
    changeMusic,
    setIsMusicPlaying,
  } = useZustandStore();

  const [didSongFinished, setDidSongFinished] = useState<boolean>(false);

  const playSong = async (musicUri: string) => {
    // unload music if already running
    if (musicTrack) {
      musicTrack?.unloadAsync();
      musicTrack?.stopAsync();
      clearMusicTrack();
    }

    const { sound, status } = await Audio.Sound.createAsync(
      { uri: musicUri },
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          setCurrentPosition(status.positionMillis / 1000);

          if (status.didJustFinish) {
            setDidSongFinished(true);
          }
        }
      }
    );

    addMusicTrack(sound);
  };

  // when song is finished then play next song
  useEffect(() => {
    if (didSongFinished) {
      // play next song
      setIsMusicPlaying(false);

      if (!currentMusic) return;
      playPreviousOrNextSong(1, currentMusic.id);
      
      setDidSongFinished(false);
    }
  }, [didSongFinished]);

  const pauseSong = () => {
    musicTrack?.pauseAsync();
  };

  const resumeSong = () => {
    musicTrack?.playAsync();
  };

  const playPreviousOrNextSong = (inc: 1 | -1, musicId: string) => {
    const { status, uri } = changeMusic(musicId, inc);

    // if there are no next or previous song
    if (!status) return;

    // reset slider position
    setCurrentPosition(0);

    // play next song
    setIsMusicPlaying(true);
    playSong(uri);
  };

  return { playSong, pauseSong, resumeSong, playPreviousOrNextSong };
};

export default useMusic;
