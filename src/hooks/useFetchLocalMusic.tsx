import useTrackStore from "@/store/track-store";
import { useEffect } from "react";
import { getAll } from "react-native-get-music-files";

const useFetchLocalMusic = () => {
  const { allLocalMusicTracks, setAllLocalMusicTracks, setAllCoverImages } =
    useTrackStore([
      "allLocalMusicTracks",
      "setAllLocalMusicTracks",
      "setAllCoverImages",
    ]);

  const fetchLocalMusicFiles = async () => {
    const fetchedMusicFiles = await getAll({
      limit: 200,
      minSongDuration: 1000,
    });

    if (Array.isArray(fetchedMusicFiles)) {
      allLocalMusicTracks.length <= 0 &&
        setAllLocalMusicTracks(
          fetchedMusicFiles.map((musicFile) => ({
            ...musicFile,
            cover: !musicFile.cover,
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
  };

  useEffect(() => {
    fetchLocalMusicFiles();
  }, []);

  useEffect(() => {
    console.log("inside useMusicTrack");
  });
};

export default useFetchLocalMusic;
