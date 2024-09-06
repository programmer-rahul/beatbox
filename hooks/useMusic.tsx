import useZustandStore from "@/store/zustand-store";
import { TMusicFile } from "@/types/music";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";

const useMusic = () => {
  const { navigate } = useRouter();

  const {
    currentMusic,
    setCurrentPosition,
    addMusicTrack,
    musicTrack,
    clearMusicTrack,
    changeMusic,
    setIsMusicPlaying,
    setCurrentMusic,
    isMusicPlaying,
  } = useZustandStore();

  const [didSongFinish, setDidSongFinish] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Lock mechanism
  const actionInProgressRef = useRef<boolean>(false); // Ref to prevent race conditions

  const playSong = async (musicUri: string) => {
    if (isLoading || actionInProgressRef.current) return; // Block if a song is already loading or an action is in progress
    setIsLoading(true); // Set the lock
    actionInProgressRef.current = true; // Prevent multiple actions

    try {
      // Unload previous track if one is playing
      if (musicTrack) {
        await musicTrack.stopAsync();
        await musicTrack.unloadAsync();
        clearMusicTrack();
      }

      // Reset slider position
      setCurrentPosition(0);

      // Create and play the new track
      const { sound } = await Audio.Sound.createAsync(
        { uri: musicUri },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 },
        (status) => {
          if (status.isLoaded) {
            setCurrentPosition(status.positionMillis / 1000);

            if (status.didJustFinish) {
              setDidSongFinish(true);
            }
          }
        }
      );

      setIsMusicPlaying(true);
      addMusicTrack(sound);
    } catch (error) {
      console.log("Error loading song:", error);
    }

    setIsLoading(false); // Release the lock after the song is loaded
    actionInProgressRef.current = false; // Reset action flag
  };

  // Handle song completion and play the next song
  useEffect(() => {
    if (didSongFinish) {
      setIsMusicPlaying(false);

      if (!currentMusic) return;
      playPreviousOrNextSong(1, currentMusic.id);

      setDidSongFinish(false);
    }
  }, [didSongFinish]);

  const pauseSong = () => {
    musicTrack?.pauseAsync();
  };

  const resumeSong = () => {
    musicTrack?.playAsync();
  };

  const playPreviousOrNextSong = async (inc: 1 | -1, musicId: string) => {
    if (isLoading || actionInProgressRef.current) return; // Prevent multiple actions

    const { status, uri } = changeMusic(musicId, inc);

    // If there are no next or previous songs
    if (!status) return;

    // Play next song
    await playSong(uri);
  };

  // helper functions
  const onMusicPlayPause = () => {
    if (!currentMusic) return;
    setIsMusicPlaying(!isMusicPlaying);
    isMusicPlaying ? pauseSong() : resumeSong();
  };

  const onMusicFilePress = (musicFile: TMusicFile) => {
    setCurrentMusic(musicFile);

    // resume current song
    if (currentMusic?.id === musicFile.id) {
    }
    // start new song
    else {
      // start playing song
      playSong(musicFile.uri);
    }

    !isMusicPlaying && setIsMusicPlaying(true);

    // change route
    navigate("/player");
  };

  return {
    playSong,
    pauseSong,
    resumeSong,
    playPreviousOrNextSong,
    onMusicPlayPause,
    onMusicFilePress,
  };
};

export default useMusic;
