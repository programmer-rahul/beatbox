import { useEffect, useState } from "react";
import { getAll } from "react-native-get-music-files";
import useZustandStore from "../store/useZustandStore";

export const scanLocalMusicFiles = async (limit = 300) => {
  const fetchedMusicFiles = await getAll({
    limit: limit,
    minSongDuration: 50000,
    coverQuality: 0.1,
  });

  if (Array.isArray(fetchedMusicFiles)) {
    return fetchedMusicFiles.map((musicFile) => ({
      ...musicFile,
      cover: musicFile.cover ? true : false,
    }));
  }

  return [];
};

const useFetchLocalMusic = () => {
  const setAllLocalMusicTracks = useZustandStore(
    (state) => state.setAllLocalMusicTracks,
  );

  const [isFetching, setIsFetching] = useState(true);

  const fetchLocalMusicFiles = async () => {
    const fetchedMusicFiles = await scanLocalMusicFiles(20);
    setIsFetching(false);
    setAllLocalMusicTracks(fetchedMusicFiles);
  };

  useEffect(() => {
    useZustandStore.getState().allLocalMusicTracks.length === 0
      ? fetchLocalMusicFiles()
      : setIsFetching(false);
  }, []);

  console.log("INSIDE useFETCH_LOCAL_MUSIC");

  return { isFetching };
};

export default useFetchLocalMusic;
