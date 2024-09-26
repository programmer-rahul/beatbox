import useTrackStore from "@/store/track-store";
import { useEffect } from "react";
import { getAll } from "react-native-get-music-files";

const useFetchLocalMusic = () => {
  const { allLocalMusicTracks, setAllLocalMusicTracks } = useTrackStore([
    "allLocalMusicTracks",
    "setAllLocalMusicTracks",
  ]);

  const fetchLocalMusicFiles = async () => {
    const fetchedMusicFiles = await getAll({
      limit: 200,
      coverQuality: 1,
      minSongDuration: 10,
    });

    if (Array.isArray(fetchedMusicFiles)) {
      setAllLocalMusicTracks(fetchedMusicFiles);
    }
  };

  useEffect(() => {
    allLocalMusicTracks.length <= 0 && fetchLocalMusicFiles();
  }, []);

  useEffect(() => {
    console.log("inside useMusicTrack");
  });
};

export default useFetchLocalMusic;
