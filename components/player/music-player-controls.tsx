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
    currentPosition,
    setIsMusicPlaying,
    setCurrentPosition,
    isMusicPlaying,
    currentMusic,
  } = useZustandStore();

  const { playSong, pauseSong, resumeSong } = useMusic();

  // when music pause and play
  const onMusicPlayPause = () => {
    if (!currentMusic) return;
    setIsMusicPlaying(!isMusicPlaying);
    isMusicPlaying ? pauseSong() : resumeSong();
  };

  // when changing music
  const onMusicPreviousNext = (inc: 1 | -1) => {
    const { status, uri } = changeMusic(musicId, inc);

    // if there are no next or previous song
    if (!status) return;

    // reset slider position
    setCurrentPosition(0);

    // play next song
    setIsMusicPlaying(true);
    playSong(uri);
  };

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
          onPress={() => onMusicPreviousNext(-1)}
        />
        <Feather
          name={isMusicPlaying ? "pause-circle" : "play-circle"}
          size={44}
          color="#292929"
          onPress={onMusicPlayPause}
        />
        <Feather
          name="skip-forward"
          size={30}
          color="#292929"
          onPress={() => onMusicPreviousNext(1)}
        />
      </View>
    </View>
  );
};

export default MusicPlayerControls;
