import { searchSongs } from "react-native-get-music-files";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchCoverImage = async (title: string) => {
  try {
    // Check if cover is already cached
    const cachedCover = await AsyncStorage.getItem(`cover_${title}`);
    if (cachedCover) console.log("COVER IMAGE FETCHED FROM ASYNCSTORAGE");
    if (cachedCover) return cachedCover;

    // Fetch cover image if not in cache
    const songs = await searchSongs({
      searchBy: title,
      coverQuality: 60,
    });

    // Store cover in cache if found and return
    if (Array.isArray(songs) && songs.length > 0 && songs[0].cover) {
      await AsyncStorage.setItem(`cover_${title}`, songs[0].cover);
      return songs[0].cover;
    }

    return null;
  } catch (error) {
    console.error("Error fetching cover image:", error);
    return null;
  }
};

export { fetchCoverImage };
