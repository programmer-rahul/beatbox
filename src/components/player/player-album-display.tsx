import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { Feather } from "@expo/vector-icons";
import { Image, View } from "react-native";

const PlayerAlbumDisplay = () => {
  const { currentMusicTrack } = useTrackStore();
  return (
    <View className="w-11/12 aspect-square rounded-full border-8 border-main/40 bg-main/30 self-center items-center justify-center">
      {currentMusicTrack ? (
        <Image
          source={{ uri: currentMusicTrack.cover }}
          className="w-full h-full rounded-full"
        />
      ) : (
        <Feather name="music" size={180} color={COLORS.main} />
      )}
    </View>
  );
};

export default PlayerAlbumDisplay;
