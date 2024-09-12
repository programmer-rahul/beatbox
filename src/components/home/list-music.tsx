import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import { TMusicFile } from "@/types/music";
import useMusic from "@/hooks/useMusic";
import COLORS from "@/constants/colors";

const ListMusic = ({ musicFile }: { musicFile: TMusicFile }) => {
  const { filename, duration } = musicFile;
  const { onMusicFilePress } = useMusic();

  return (
    <View className="flex-row justify-between items-center rounded-md mb-4 py-1">
      <Pressable
        className="flex-1 flex-row space-x-2"
        onPress={() => onMusicFilePress(musicFile)}
      >
        <View className="h-10 aspect-square items-center justify-center bg-main/20 border border-main rounded-md">
          <Feather name="music" size={22} color={COLORS.main} />
        </View>
        <View className="flex-1">
          <Text
            className="text-primaryText text-xs font-spacemono"
            numberOfLines={1}
          >
            {filename}
          </Text>
          <Text className="text-secondaryText font-spacemono">
            {formatMusicFileDuration(duration)}
          </Text>
        </View>
      </Pressable>
      <View>
        <Entypo
          name="dots-three-vertical"
          size={20}
          color={COLORS.secondaryIcon}
        />
      </View>
    </View>
  );
};

export default ListMusic;
