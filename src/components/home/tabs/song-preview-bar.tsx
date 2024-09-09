import { Pressable, Text, View } from "react-native";
import useZustandStore from "@/store/zustand-store";
import { Feather } from "@expo/vector-icons";
import { formatMusicFileDuration } from "@/lib/helper";
import useMusic from "@/hooks/useMusic";

const SongPreviewBar = () => {
  const { currentMusic, currentPosition, isMusicPlaying } = useZustandStore();

  const { onMusicPlayPause, playPreviousOrNextSong, onMusicFilePress } =
    useMusic();

  return (
    <View className="w-full h-14 absolute items-center justify-center  bg-stone-200 border-t border-slate-100 bottom-0 z-10">
      {currentMusic && (
        <View className="flex-row items-center justify-between w-full px-2">
          <Pressable
            className="flex-row space-x-2 items-center w-[70%]"
            onPress={() => onMusicFilePress(currentMusic)}
          >
            <View className="w-11 h-11 items-center rounded-full justify-center bg-lime-200/20 border border-lime -600">
              <Feather name="music" size={22} color="#65a30d" />
            </View>
            <View>
              <Text
                className="text-neutral-900 text-xs font-semibold"
                numberOfLines={1}
              >
                {currentMusic.filename}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-neutral-900 text-xs">
                  {formatMusicFileDuration(currentPosition)}
                </Text>
                <Text> : </Text>
                <Text className="text-neutral-500 text-xs">
                  {formatMusicFileDuration(currentMusic.duration)}
                </Text>
              </View>
            </View>
          </Pressable>
          <View className="flex-row items-center space-x-3">
            <Feather
              name={isMusicPlaying ? "pause-circle" : "play-circle"}
              size={30}
              color="#65a30d"
              onPress={onMusicPlayPause}
            />
            <Feather
              name="skip-forward"
              size={30}
              color="#65a30d"
              onPress={() => playPreviousOrNextSong(1, currentMusic.id)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SongPreviewBar;
