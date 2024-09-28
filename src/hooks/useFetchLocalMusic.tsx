import useTrackStore, { trackStore } from "@/store/track-store";
import { useEffect, useState } from "react";
import { getAll } from "react-native-get-music-files";

const useFetchLocalMusic = () => {
  const { setAllLocalMusicTracks, setAllCoverImages } = useTrackStore([
    "setAllLocalMusicTracks",
    "setAllCoverImages",
  ]);

  const [isFetching, setIsFetching] = useState(true);

  const fetchLocalMusicFiles = async () => {
    setIsFetching(
      trackStore.getState().allLocalMusicTracks.length ? false : true,
    );

    const fetchedMusicFiles = await getAll({
      limit: 200,
      minSongDuration: 1000,
    });

    if (Array.isArray(fetchedMusicFiles)) {
      console.log("len", trackStore.getState().allLocalMusicTracks.length <= 0);
      trackStore.getState().allLocalMusicTracks.length <= 0 &&
        setAllLocalMusicTracks(
          fetchedMusicFiles.map((musicFile) => ({
            ...musicFile,
            cover: musicFile.cover ? true : false,
          })),
        );

      const coverImages: { [key: string]: string } = {};

      fetchedMusicFiles.forEach((musicFile) => {
        if (musicFile.cover) {
          coverImages[musicFile.url] = musicFile.cover;
        }
      });

      setAllCoverImages(coverImages);
    }

    setIsFetching(false)
  };

  useEffect(() => {
    fetchLocalMusicFiles();
  }, []);

  useEffect(() => {
    console.log("inside useFetchLocalMusic");
  });

  return { isFetching };
};

export default useFetchLocalMusic;
