import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import { TMusicTrack } from "@/types/store/track-store";
import useTrackStore from "@/store/track-store";
import TrackPlayer from "react-native-track-player";
import { useRouter } from "expo-router";
import useQueueStore from "@/store/queue-store";

const MusicFile = ({ musicFile }: { musicFile: TMusicTrack }) => {
  const { allLocalMusicTracks, currentMusicTrack, setCurrentMusicTrack } =
    useTrackStore();

  const { currentQueue, setCurrentQueue } = useQueueStore();

  const onMusicFilePress = async () => {
    setCurrentMusicTrack(musicFile);

    if (currentMusicTrack?.url !== musicFile.url) {
      if (!currentQueue.tracksCount) {
        await TrackPlayer.reset();
        await TrackPlayer.add(allLocalMusicTracks);

        setCurrentQueue({
          type: "home",
          tracksCount: allLocalMusicTracks.length,
        });
      }

      let trackIndex = allLocalMusicTracks.findIndex(
        (localMusicTrack) => localMusicTrack.url === musicFile.url
      );

      await TrackPlayer.skip(trackIndex);
      await TrackPlayer.play();
    }
  };

  return (
    <View className="flex-row justify-between items-center rounded-md mt-4">
      <Pressable
        className="flex-1 flex-row space-x-2"
        onPress={onMusicFilePress}
      >
        <View className="h-10 aspect-square items-center justify-center bg-main/20 border border-main rounded-md">
          <Feather name="music" size={22} color={COLORS.main} />
        </View>

        <View className="flex-1">
          <Text
            className="text-primaryText text-xs font-spacemono"
            numberOfLines={1}
          >
            {musicFile.title}
          </Text>
          <Text className="text-secondaryText text-xs font-spacemono">
            {formatMusicFileDuration(musicFile.duration, "milliseconds")}
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

export default MusicFile;
