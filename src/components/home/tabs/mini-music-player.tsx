import { Image, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { useRouter } from "expo-router";
import PlayPauseMusicIcon from "@/components/reusable/icons/play-pause-music-icon";
import DisplayCurrentMusicPosition from "@/components/reusable/display-current-music-position";
import PlayPreviusNextMusicIcon from "@/components/reusable/icons/play-previus-next-music-icon";

const MiniMusicPlayer = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);
  const { navigate } = useRouter();

  console.log("inside mini-music-player");

  return currentMusicTrack ? (
    <View className="absolute -bottom-1 z-10 h-14 w-full items-center justify-center rounded-t-lg bg-secondaryBg pl-5 pr-2">
      <View className="w-full flex-row items-center justify-between gap-2">
        <Pressable
          className="flex-1 flex-row items-center space-x-2"
          onPress={() => navigate("/player")}
        >
          <View className="aspect-square h-10 items-center justify-center rounded-md bg-main/20">
            {currentMusicTrack.cover.length ? (
              <Image
                source={{ uri: currentMusicTrack.cover }}
                className="h-full w-full rounded-md"
              />
            ) : (
              <Feather name="music" size={22} color={COLORS.main} />
            )}
          </View>
          <View className="flex-1">
            <Text
              className="font-spacemono text-xs font-medium text-primaryText"
              numberOfLines={1}
            >
              {currentMusicTrack.title}
            </Text>
            <View className="flex-row items-center">
              <DisplayCurrentMusicPosition />
              <Text className="font-spacemono text-xs text-secondaryText">
                :
              </Text>
              <Text className="font-spacemono text-xs text-secondaryText">
                {formatMusicFileDuration(
                  currentMusicTrack.duration,
                  "milliseconds",
                )}
              </Text>
            </View>
          </View>
        </Pressable>
        <View className="flex-row items-center">
          <PlayPauseMusicIcon size={40} />
          <View className="ml-2">
            <PlayPreviusNextMusicIcon type="next" />
          </View>
        </View>
      </View>
    </View>
  ) : null;
};

export default MiniMusicPlayer;
