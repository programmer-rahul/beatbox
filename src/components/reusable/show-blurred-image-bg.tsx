import { View } from "react-native";
import { useEffect, useState } from "react";
import useZustandStore from "../../store/useZustandStore";
import { useNavigationState } from "@react-navigation/native";
import { Image } from "react-native";
import { BlurView } from "@react-native-community/blur";
import COLORS from "../../constants/colors";
import { fetchCoverImage } from "../../lib/music";

const ShowBlurredImageBg = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const isSwiping = useZustandStore((state) => state.isSwiping);
  const navigationTab = useNavigationState((state) => state);

  const [musicCover, setMusicCover] = useState("");

  useEffect(() => {
    if (currentMusicTrack?.cover) {
      fetchCoverImage(currentMusicTrack?.title).then(
        (coverImage) => coverImage && setMusicCover(coverImage),
      );
    } else {
      setMusicCover("");
    }
  }, [currentMusicTrack]);

  return (
    <View className="absolute h-full w-full">
      {currentMusicTrack && currentMusicTrack.cover && musicCover && (
        <View className="h-full" style={{ backgroundColor: COLORS.primaryBg }}>
          <Image
            key={"blurryImage"}
            source={{ uri: musicCover }}
            className="h-full w-full"
            resizeMode="repeat"
            style={{
              display:
                navigationTab?.index === 1 && !isSwiping ? "flex" : "none",
            }}
          />

          {navigationTab?.index === 1 && !isSwiping && (
            <BlurView
              blurRadius={20}
              blurAmount={30}
              overlayColor={COLORS.primaryBg + "cc"}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ShowBlurredImageBg;
