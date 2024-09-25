import { View, Text, Pressable, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import { TMusicTrack } from "@/types/store/track-store";
import useTrackStore from "@/store/track-store";
import TrackPlayer from "react-native-track-player";
import useQueueStore from "@/store/queue-store";

const MusicFile = ({
  musicFile,
  lastFile,
}: {
  musicFile: TMusicTrack;
  index?: number;
  lastFile: boolean;
}) => {
  const {
    allLocalMusicTracks,
    currentMusicTrack,
    setCurrentMusicTrack,
    setIsTrackPlaying,
  } = useTrackStore();

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

      setIsTrackPlaying(true);
    }
  };

  return (
    <View
      className="flex-row justify-between items-center rounded-md mt-4"
      style={{
        marginBottom: lastFile ? 50 : 0,
      }}
    >
      <Pressable
        className="flex-1 flex-row space-x-2"
        onPress={onMusicFilePress}
      >
        <View className="h-10 aspect-square items-center justify-center bg-main/20 border border-main rounded-md">
          {musicFile.cover ? (
            <Image
              source={{ uri: musicFile.cover }}
              className="w-full h-full rounded-md"
            />
          ) : (
            <Feather name="music" size={22} color={COLORS.main} />
          )}
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
