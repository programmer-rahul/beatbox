import { useEffect, useState } from "react";
import { getAll } from "react-native-get-music-files";
import useZustandStore from "../store/useZustandStore";

const useFetchLocalMusic = () => {
  const setAllLocalMusicTracks = useZustandStore(
    (state) => state.setAllLocalMusicTracks,
  );

  const [isFetching, setIsFetching] = useState(true);

  const fetchLocalMusicFiles = async () => {
    const allLocalMusicTracks = useZustandStore.getState().allLocalMusicTracks;

    const fetchedMusicFiles = await getAll({
      limit: 300,
      minSongDuration: 50000,
    });

    if (Array.isArray(fetchedMusicFiles)) {
      allLocalMusicTracks.length <= 0 &&
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
    useZustandStore.getState().allLocalMusicTracks.length === 0
      ? fetchLocalMusicFiles()
      : setIsFetching(false);
  }, []);

  console.log("INSIDE useFETCH_LOCAL_MUSIC");

  return { isFetching };
};

export default useFetchLocalMusic;
