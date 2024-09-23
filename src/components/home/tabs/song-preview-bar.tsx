import { Pressable, Text, View } from "react-native";
import useZustandStore from "@/store/zustand-store";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import useMusic from "@/hooks/useMusic";
import COLORS from "@/constants/colors";

const SongPreviewBar = () => {
  const { currentMusic, currentPosition, isMusicPlaying } = useZustandStore();

  const { onMusicPlayPause, playPreviousOrNextSong, onMusicFilePress } =
    useMusic();

  return currentMusic ? (
    <View className="w-full h-14 absolute items-center justify-center bg-secondaryBg bottom-0 z-10 rounded-t-lg px-4">
      <View className="flex-row items-center gap-2 justify-between w-full">
        <Pressable
          className="flex-row space-x-2 items-center flex-1"
          onPress={() => onMusicFilePress(currentMusic)}
        >
          <View className="w-10 aspect-square items-center rounded-full justify-center border-2 border-main/60">
            <Feather name="music" size={22} color={COLORS.main} />
          </View>
          <View className="flex-1">
            <Text
              className="text-primaryText text-xs font-spacemono font-medium"
              numberOfLines={1}
            >
              {currentMusic.filename}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-secondaryText text-xs font-spacemono">
                {formatMusicFileDuration(currentPosition)}
              </Text>
              <Text> : </Text>
              <Text className="text-secondaryText text-xs">
                {formatMusicFileDuration(currentMusic.duration)}
              </Text>
            </View>
          </View>
        </Pressable>
        <View className="flex-row items-center space-x-3">
          <Feather
            name={isMusicPlaying ? "pause-circle" : "play-circle"}
            size={30}
            color={isMusicPlaying ? COLORS.primaryIcon : COLORS.secondaryIcon}
            onPress={onMusicPlayPause}
          />
          <Feather
            name="skip-forward"
            size={30}
            color={COLORS.secondaryIcon}
            onPress={() => playPreviousOrNextSong(1, currentMusic.id)}
          />
        </View>
      </View>
    </View>
  ) : null;
};

export default SongPreviewBar;
