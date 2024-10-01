import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { searchSongs } from "react-native-get-music-files";

const PlayerAlbumDisplay = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  const [musicCover, setMusicCover] = useState("");

  useEffect(() => {
    (async () => {
      const songs = await searchSongs({
        searchBy: currentMusicTrack?.title,
      });
      if (typeof songs !== "string") {
        setMusicCover(songs[0].cover);
      }
    })();
  }, [currentMusicTrack]);
  return (
    <View
      className="aspect-square w-11/12 items-center justify-center self-center rounded-xl border-main/40 bg-main/30"
      style={{
        backgroundColor: COLORS.main + "33",
        borderColor: COLORS.main + "44",
        borderWidth: !currentMusicTrack?.cover ? 6 : 0,
      }}
    >
      {currentMusicTrack?.cover && musicCover ? (
        <FastImage
          source={{
            uri: musicCover,
            priority: "normal",
            cache: FastImage.cacheControl.immutable,
          }}
          className="h-full w-full rounded-md"
        />
      ) : (
        <Feather name="music" size={180} color={COLORS.main} />
      )}
    </View>
  );
};

export default PlayerAlbumDisplay;
