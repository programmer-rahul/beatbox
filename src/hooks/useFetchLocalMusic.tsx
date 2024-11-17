import { useEffect, useState } from "react";
import { getAll } from "react-native-get-music-files";
import useZustandStore from "../store/useZustandStore";
import { Alert } from "react-native";

export const scanLocalMusicFiles = async (limit = 300) => {
  try {
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
  } catch (error) {
    console.log("Error in Fetching Music Files");
    Alert.alert("Error in Fetching Music Files");
  }

  return [];
};

const useFetchLocalMusic = () => {
  const setAllLocalMusicTracks = useZustandStore(
    (state) => state.setAllLocalMusicTracks,
  );

  const [isFetching, setIsFetching] = useState(true);

  const fetchLocalMusicFiles = async () => {
    const fetchedMusicFiles = await scanLocalMusicFiles();
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
