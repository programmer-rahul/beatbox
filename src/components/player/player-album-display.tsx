import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { Image, View } from "react-native";

const PlayerAlbumDisplay = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);
  return (
    <View className="aspect-square w-11/12 items-center justify-center self-center rounded-full border-8 border-main/40 bg-main/30">
      {currentMusicTrack?.cover ? (
        <Image
          source={{ uri: currentMusicTrack.cover }}
          className="h-full w-full rounded-full"
        />
      ) : (
        <Feather name="music" size={180} color={COLORS.main} />
      )}
    </View>
  );
};

export default PlayerAlbumDisplay;
