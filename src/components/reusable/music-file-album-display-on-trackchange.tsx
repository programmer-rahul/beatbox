import { Music } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { fetchCoverImage } from "./../../lib/music";
import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import useZustandStore from "../../store/useZustandStore";

function MusicFileAlbumDisplayOnTrackChange({
  size = "small",
  imgPriority = "normal",
}: {
  size: "small" | "big";
  imgPriority?: "normal" | "high";
}) {
  const [musicCover, setMusicCover] = useState("");
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  console.log("INSIDE MUSIC_FILE_ALBUM_DISPLAY_ON_TRACK_CHANGE");

  useEffect(() => {
    currentMusicTrack?.cover
      ? fetchCoverImage(currentMusicTrack?.title).then(
          (coverImage) => coverImage && setMusicCover(coverImage),
        )
      : musicCover && setMusicCover("");
  }, [currentMusicTrack]);

  if (!currentMusicTrack) return;
  return (
    <View
      className={
        size === "small"
          ? "aspect-square h-11 items-center justify-center rounded-md"
          : "aspect-square w-9/12 items-center justify-center self-center rounded-xl bg-main/30"
      }
      style={{ backgroundColor: COLORS.main + "33" }}
    >
      {musicCover ? (
        <FastImage
          source={{
            uri: musicCover,
            priority: imgPriority,
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

export default memo(MusicFileAlbumDisplayOnTrackChange);
