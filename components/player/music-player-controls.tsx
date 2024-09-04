import { View, Text } from "react-native";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomRangeSlider from "../reusable/custom-range-slider";
import { formatMusicFileDuration } from "@/lib/helper";
import useZustandStore from "@/store/zustand-store";
import useMusic from "@/hooks/useMusic";

const MusicPlayerControls = ({
  duration,
  musicId,
}: {
  duration: number;
  musicId: string;
}) => {
  const {
    changeMusic,
    currentMusic,
    musicTrack,
    currentPosition,
    clearMusicTrack,
    setIsMusicPlaying,
    isMusicPlaying,
  } = useZustandStore();

  const { playSong, pauseSong, resumeSong } = useMusic();

  useEffect(() => {
    if (currentMusic) {
      musicTrack?.unloadAsync();
      musicTrack?.stopAsync();
      clearMusicTrack();

      isMusicPlaying && playSong();
      !isMusicPlaying && setIsMusicPlaying(true);
    }
  }, [currentMusic]);

  useEffect(() => {
    if (isMusicPlaying) {
      musicTrack ? resumeSong() : playSong();
    } else {
      pauseSong();
    }
  }, [isMusicPlaying]);

  return (
    <View className="space-y-10">
      {/* slider */}
      <View>
        <CustomRangeSlider totalMusicDuration={duration} />
        <View className="px-4 flex-row justify-between">
          <Text className="text-xs text-neutral-500">
            {formatMusicFileDuration(currentPosition)}
          </Text>
          <Text className="text-xs text-neutral-500 text-right">
            {formatMusicFileDuration(duration)}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 justify-center items-center">
        <Feather
          name="skip-back"
          size={30}
          color="#292929"
          onPress={() => {
            changeMusic(musicId, -1);
          }}
        />
        <Feather
          name={isMusicPlaying ? "pause-circle" : "play-circle"}
          size={44}
          color="#292929"
          onPress={() => {
            console.log("pressing");
            setIsMusicPlaying(!isMusicPlaying);
          }}
        />

        <Feather
          name="skip-forward"
          size={30}
          color="#292929"
          onPress={() => {
            changeMusic(musicId, 1);
          }}
        />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
