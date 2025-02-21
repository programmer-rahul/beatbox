import useMusicStore from "@/store/useMusicStore";
import { TMusic } from "@/types/music";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getAll } from "react-native-get-music-files";
import { generateUUID } from "./uuid";

const scanLocalMusicFiles = async (limit = 200) => {
  try {
    const fetchedMusicFiles = await getAll({
      limit: limit,
      minSongDuration: 50000,
      coverQuality: 50,
    });

    if (Array.isArray(fetchedMusicFiles)) {
      return fetchedMusicFiles;
    }
  } catch (error) {
    Alert.alert("Error in Fetching Music Files");
  }
  return [];
};

const storeMusicFilesInChunks = async (
  musicFiles: TMusic[],
  chunkSize: number = 10,
) => {
  const multiSetPairs: [string, string][] = [];
  for (let i = 0; i < musicFiles.length; i += chunkSize) {
    const chunk = musicFiles.slice(i, i + chunkSize);
    multiSetPairs.push([
      `cachedLocalMusicFiles_${i / chunkSize}`,
      JSON.stringify(chunk),
    ]);
  }
  await AsyncStorage.multiSet(multiSetPairs);
};

const retrieveAllCachedMusicFiles = async () => {
  let allMusicFiles: TMusic[] = [];
  let chunkIndex = 0;
  const keys = [];

  while (true) {
    const key = `cachedLocalMusicFiles_${chunkIndex}`;
    const chunk = await AsyncStorage.getItem(key);
    if (!chunk) break;
    keys.push(key);
    chunkIndex++;
  }

  const results = await AsyncStorage.multiGet(keys);
  results.forEach(([_, value]) => {
    if (value) {
      const musicFiles = JSON.parse(value);
      if (Array.isArray(musicFiles)) {
        allMusicFiles = allMusicFiles.concat(musicFiles);
      }
    }
  });

  return allMusicFiles;
};

const scanAndCacheMusicFiles = async () => {
  try {
    const cachedLocalMusicFiles = await retrieveAllCachedMusicFiles();

    if (cachedLocalMusicFiles.length > 0) {
      console.log("Using Cached Local Music Files");

      useMusicStore.setState({ localMusicFiles: cachedLocalMusicFiles });
      useMusicStore.setState({
        localMusicFilesCount: cachedLocalMusicFiles.length,
      });

      console.log("Cache Found");
      return cachedLocalMusicFiles.length > 0;
    } else {
      console.log("Scanning Local Music Files");
      const scannedMusicFiles = await scanLocalMusicFiles();

      const musicFiles: TMusic[] = scannedMusicFiles.map((musicFile) => {
        const { genre, ...rest } = musicFile;
        return { ...rest, id: generateUUID() };
      });

      await storeMusicFilesInChunks(musicFiles);

      useMusicStore.setState({ localMusicFiles: musicFiles });
      useMusicStore.setState({ localMusicFilesCount: musicFiles.length });

      console.log("Scan Complete");
      return musicFiles.length > 0;
    }
  } catch (err) {
    console.log("Error while scanning music files: ", err);
    return false;
  }
};

export { scanLocalMusicFiles, scanAndCacheMusicFiles };
