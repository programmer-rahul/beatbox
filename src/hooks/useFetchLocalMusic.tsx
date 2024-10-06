import { trackStore } from "./../store/track-store";
import { useEffect, useState } from "react";
import { getAll } from "react-native-get-music-files";

const useFetchLocalMusic = () => {
  const setAllLocalMusicTracks = trackStore(
    (state) => state.setAllLocalMusicTracks,
  );

  const [isFetching, setIsFetching] = useState(true);

  const fetchLocalMusicFiles = async () => {
    setIsFetching(!trackStore.getState().allLocalMusicTracks.length);

    const fetchedMusicFiles = await getAll({
      limit: 40,
      minSongDuration: 5000,
    });

    if (Array.isArray(fetchedMusicFiles)) {
      trackStore.getState().allLocalMusicTracks.length <= 0 &&
        setAllLocalMusicTracks(
          fetchedMusicFiles.map((musicFile) => ({
            ...musicFile,
            cover: musicFile.cover ? true : false,
          })),
        );
    }

    setIsFetching(false);
  };

  useEffect(() => {
    trackStore.getState().allLocalMusicTracks.length === 0
      ? fetchLocalMusicFiles()
      : setIsFetching(false);
  }, []);

  console.log("INSIDE useFETCH_LOCAL_MUSIC");

  return { isFetching };
};

export default useFetchLocalMusic;
