import trackStore from "@/store/track-store";
import { TMusicTrack } from "@/types/store/track-store";
import { useEffect } from "react";
import { getAll } from "react-native-get-music-files";

const useMusicTracks = () => {
  const { allLocalMusicTracks, setAllLocalMusicTracks, currentMusicTrack } =
    trackStore();

  const fetchLocalMusicFiles = async () => {
    const fetchedMusicFiles = await getAll({
      limit: 200,
      coverQuality: 1,
      minSongDuration: 10,
    });

    if (typeof fetchedMusicFiles !== typeof "") {
      setAllLocalMusicTracks(fetchedMusicFiles as [] as TMusicTrack[]);
    }
  };

  useEffect(() => {
    allLocalMusicTracks.length <= 0 && fetchLocalMusicFiles();
  }, []);

  return { allLocalMusicTracks, currentMusicTrack };
};

export default useMusicTracks;
