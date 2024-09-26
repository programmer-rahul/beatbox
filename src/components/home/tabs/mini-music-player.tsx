import { Image, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import useTrackStore from "@/store/track-store";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useRouter } from "expo-router";
import { memo, useEffect } from "react";

const MiniMusicPlayer = () => {
  // const progress = useProgress();
  const { navigate } = useRouter();

  const {
    currentMusicTrack,
    changeCurrentMusicTrack,
    isTrackPlaying,
    setIsTrackPlaying,
  } = useTrackStore([
    "currentMusicTrack",
    "changeCurrentMusicTrack",
    "isTrackPlaying",
    "setIsTrackPlaying",
  ]);

  useEffect(() => {
    console.log("inside mini-music-player");
  });

  const onTrackPlayPause = async () => {
    isTrackPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    setIsTrackPlaying(!isTrackPlaying);
  };

  return currentMusicTrack ? (
    <View className="absolute -bottom-1 z-10 h-14 w-full items-center justify-center rounded-t-lg bg-secondaryBg px-4">
      <View className="w-full flex-row items-center justify-between gap-2">
        <Pressable
          className="flex-1 flex-row items-center space-x-2"
          onPress={() => navigate("/player")}
        >
          <View className="aspect-square w-10 items-center justify-center rounded-full border-2 border-main/40">
            {currentMusicTrack.cover.length ? (
              <Image
                source={{ uri: currentMusicTrack.cover }}
                className="h-full w-full rounded-full"
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
              <Text className="font-spacemono text-xs text-secondaryText">
                {formatMusicFileDuration(0, "seconds")}
              </Text>
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

export default memo(MiniMusicPlayer);
