import COLORS from "./../../constants/colors";
import { fetchCoverImage } from "./../../lib/music";
// import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

function MusicFileAlbumDisplay({
  title,
  cover,
}: {
  title: string;
  cover: boolean;
}) {
  const [musicCover, setMusicCover] = useState("");
  console.log("INSIDE MUSIC_FILE_ALBUM_DISPLAY");

  useEffect(() => {
    cover &&
      fetchCoverImage(title).then(
        (coverImage) => coverImage && setMusicCover(coverImage),
      );
  }, []);

  return (
    <View
      className="aspect-square h-11 items-center justify-center rounded-md"
      style={{ backgroundColor: COLORS.main + "22" }}
    >
      {musicCover ? (
        <FastImage
          source={{
            uri: musicCover,
            priority: "normal",
            cache: FastImage.cacheControl.immutable,
          }}
          className="h-full w-full rounded-md"
        />
      ) : (
        // <Feather name="music" size={22} color={COLORS.main} />
        null
      )}
    </View>
  );
}

export default MusicFileAlbumDisplay;
