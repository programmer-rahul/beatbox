import { Pressable, Text, View } from "react-native";
import useZustandStore from "@/store/zustand-store";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import useMusic from "@/hooks/useMusic";
import COLORS from "@/constants/colors";
import useTrack from "@/hooks/useTrack";

const SongPreviewBar = () => {
  const { currentMusic } = useZustandStore();
  const { onMusicFilePress } = useMusic();
  const { onTrackPlayPause, playNextTrack, isTrackPlaying, progress } =
    useTrack();

  return currentMusic ? (
    <View className="w-full h-14 absolute items-center justify-center bg-secondaryBg bottom-0 z-10 rounded-t-lg px-4">
      <View className="flex-row items-center gap-2 justify-between w-full">
        <Pressable
          className="flex-row space-x-2 items-center flex-1"
          onPress={() => onMusicFilePress(currentMusic)}
        >
          <View className="w-10 aspect-square items-center rounded-full justify-center border-2 border-main/40">
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
                {formatMusicFileDuration(progress.position)}
              </Text>
              <Text className="text-secondaryText text-xs font-spacemono">
                :
              </Text>
              <Text className="text-secondaryText text-xs font-spacemono">
                {formatMusicFileDuration(currentMusic.duration)}
              </Text>
            </View>
          </View>
        </Pressable>
        <View className="flex-row items-center space-x-3">
          <Feather
            name={isTrackPlaying() ? "pause-circle" : "play-circle"}
            size={30}
            color={isTrackPlaying() ? COLORS.main : COLORS.secondaryIcon}
            onPress={onTrackPlayPause}
          />
          <Feather
            name="skip-forward"
            size={30}
            color={COLORS.secondaryIcon}
            onPress={() => playNextTrack(currentMusic.id)}
          />
        </View>
      </View>
    </View>
  ) : null;
};

export default SongPreviewBar;
