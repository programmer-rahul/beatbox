import { Image, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import { useRouter } from "expo-router";
import PlayPauseMusicIcon from "@/components/reusable/icons/play-pause-music-icon";
import DisplayCurrentMusicPosition from "@/components/reusable/display-current-music-position";
import PlayPreviusNextMusicIcon from "@/components/reusable/icons/play-previus-next-music-icon";
import { useProgress } from "react-native-track-player";

const MiniMusicPlayer = () => {
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);
  const { navigate } = useRouter();

  console.log("inside mini-music-player");

  return currentMusicTrack ? (
    <View
      className="absolute -bottom-1 z-10 h-14 w-full rounded-t-lg"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View
        className="h-full w-full items-center justify-center rounded-t-lg"
        style={{
          backgroundColor: COLORS.secondaryBg,
        }}
      >
        <View className="w-full flex-row items-center justify-between gap-2 pl-6 pr-2">
          <Pressable
            className="flex-1 flex-row items-center space-x-2"
            onPress={() => navigate("/player")}
          >
            <View
              className="aspect-square h-10 items-center justify-center rounded-md"
              style={{ backgroundColor: COLORS.main + "22" }}
            >
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
                style={{
                  color: COLORS.primaryBg,
                }}
              >
                {currentMusicTrack.title}
              </Text>
              <View className="flex-row items-center">
                <DisplayCurrentMusicPosition />
                <Text
                  className="font-spacemono text-xs text-secondaryText"
                  style={{
                    color: COLORS.secondaryText,
                  }}
                >
                  :
                </Text>
                <Text
                  className="font-spacemono text-xs text-secondaryText"
                  style={{
                    color: COLORS.secondaryText,
                  }}
                >
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
        <MusicRemainingDurationVisual />
      </View>
    </View>
  ) : null;
};

export default MiniMusicPlayer;

const MusicRemainingDurationVisual = () => {
  const progress = useProgress();
  const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);

  return currentMusicTrack ? (
    <View className="absolute -z-10 flex h-full w-full justify-end">
      <View
        className="h-[6%] self-start"
        style={{
          backgroundColor: COLORS.main + "aa",
          width: `${Math.floor(
            (progress.position / (currentMusicTrack?.duration / 1000)) * 100,
          )}%`,
        }}
      />
    </View>
  ) : null;
};
