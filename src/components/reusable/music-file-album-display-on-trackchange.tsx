import { Music } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { fetchCoverImage } from "./../../lib/music";
import useTrackStore, { trackStore } from "./../../store/track-store";
// import {Feather} from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

function MusicFileAlbumDisplayOnTrackChange({
  size = "small",
}: {
  size: "small" | "big";
}) {
  const [musicCover, setMusicCover] = useState("");
  const currentMusicTrack = trackStore((state) => state.currentMusicTrack);

  console.log("INSIDE MUSIC_FILE_ALBUM_DISPLAY_ON_TRACK_CHANGE");

  useEffect(() => {
    currentMusicTrack?.cover &&
      fetchCoverImage(currentMusicTrack?.title).then(
        (coverImage) => coverImage && setMusicCover(coverImage),
      );
  }, [currentMusicTrack]);

  if (!currentMusicTrack) return;
  return (
    <View
      className={
        size === "small"
          ? "aspect-square h-11 items-center justify-center rounded-md"
          : "aspect-square w-11/12 items-center justify-center self-center rounded-xl border-main/40 bg-main/30"
      }
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
        <Music color={COLORS.main} size={size === "small" ? 22 : 250} />
      )}
    </View>
  );
}

export default MusicFileAlbumDisplayOnTrackChange;
