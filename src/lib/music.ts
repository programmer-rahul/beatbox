import { searchSongs } from "react-native-get-music-files";

const fetchCoverImage = async (title: string) => {
  const songs = await searchSongs({
    searchBy: title,
    coverQuality: 60,
  });
  if (typeof songs !== "string") return songs[0].cover;
  return null;
};

export { fetchCoverImage };
