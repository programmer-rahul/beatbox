import { useEffect, useState } from "react";
import { getAll } from "react-native-get-music-files";
import useZustandStore from "../store/useZustandStore";

const useFetchLocalMusic = () => {
  const allLocalMusicTracks = useZustandStore(
    (state) => state.allLocalMusicTracks,
  );
  const setAllLocalMusicTracks = useZustandStore(
    (state) => state.setAllLocalMusicTracks,
  );

  const [isFetching, setIsFetching] = useState(false);

  const fetchLocalMusicFiles = async () => {
    setIsFetching(true);

    const fetchedMusicFiles = await getAll({
      limit: 200,
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
    console.log("HERE LENGHT IS => ", allLocalMusicTracks);
    allLocalMusicTracks.length === 0
      ? fetchLocalMusicFiles()
      : setIsFetching(false);
  }, []);

  console.log("INSIDE useFETCH_LOCAL_MUSIC");

  return { isFetching };
};

export default useFetchLocalMusic;
