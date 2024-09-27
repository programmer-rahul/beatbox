import COLORS from "@/constants/colors";
import useTrackStore, { trackStore } from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { Image, View } from "react-native";

const PlayerAlbumDisplay = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);
  return (
    <View
      className="aspect-square w-11/12 items-center justify-center self-center rounded-full border-main/40 bg-main/30"
      style={{
        backgroundColor: COLORS.main + "33",
        borderColor: COLORS.main + "44",
        borderWidth: !currentMusicTrack?.cover ? 6 : 0,
      }}
    >
      {currentMusicTrack?.cover ? (
        <Image
          source={{
            uri: trackStore.getState().allCoverImages[currentMusicTrack.url],
          }}
          className="h-full w-full rounded-full"
        />
      ) : (
        <Feather name="music" size={180} color={COLORS.main} />
      )}
    </View>
  );
};

export default PlayerAlbumDisplay;
