import { Image, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useRouter } from "expo-router";

const MiniMusicPlayer = () => {
  const progress = useProgress();
  const { navigate } = useRouter();

  const {
    currentMusicTrack,
    changeCurrentMusicTrack,
    isTrackPlaying,
    setIsTrackPlaying,
  } = useTrackStore();

  const onTrackPlayPause = async () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return currentMusicTrack ? (
    <View className="w-full h-14 absolute -bottom-1 items-center justify-center bg-secondaryBg z-10 rounded-t-lg px-4">
      <View className="flex-row items-center gap-2 justify-between w-full">
        <Pressable
          className="flex-row space-x-2 items-center flex-1"
          onPress={() => navigate("/player")}
        >
          <View className="w-10 aspect-square items-center rounded-full justify-center border-2 border-main/40">
            {currentMusicTrack.cover.length ? (
              <Image
                source={{ uri: currentMusicTrack.cover }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <Feather name="music" size={22} color={COLORS.main} />
            )}
          </View>
          <View className="flex-1">
            <Text
              className="text-primaryText text-xs font-spacemono font-medium"
              numberOfLines={1}
            >
              {currentMusicTrack.title}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-secondaryText text-xs font-spacemono">
                {formatMusicFileDuration(progress.position, "seconds")}
              </Text>
              <Text className="text-secondaryText text-xs font-spacemono">
                :
              </Text>
              <Text className="text-secondaryText text-xs font-spacemono">
                {formatMusicFileDuration(
                  currentMusicTrack.duration,
                  "milliseconds"
                )}
              </Text>
            </View>
          </View>
        </Pressable>
        <View className="flex-row items-center space-x-3">
          <Feather
            name={isTrackPlaying ? "pause-circle" : "play-circle"}
            size={30}
            color={isTrackPlaying ? COLORS.main : COLORS.secondaryIcon}
            onPress={onTrackPlayPause}
          />
          <Feather
            name="skip-forward"
            size={30}
            color={COLORS.secondaryIcon}
            onPress={() => {
              changeCurrentMusicTrack(currentMusicTrack.url, "next");
              TrackPlayer.skipToNext();
            }}
          />
        </View>
      </View>
    </View>
  ) : null;
};

export default MiniMusicPlayer;
