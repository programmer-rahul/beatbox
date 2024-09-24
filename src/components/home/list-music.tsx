import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import { TMusicTrack } from "@/types/store/track-store";
import trackStore from "@/store/track-store";
import TrackPlayer from "react-native-track-player";
import { useRouter } from "expo-router";

const ListMusic = ({ musicFile }: { musicFile: TMusicTrack }) => {
  const { navigate } = useRouter();
  const { title, duration } = musicFile;

  const { allLocalMusicTracks, currentMusicTrack, setCurrentMusicTrack } =
    trackStore();

  const onMusicFilePress = async () => {
    setCurrentMusicTrack(musicFile);

    if (currentMusicTrack?.url !== musicFile.url && 0) {
      await TrackPlayer.reset();

      const homeTracks = allLocalMusicTracks.map((musicTrack) => ({
        url: musicTrack.url,
        title: musicTrack.title,
        duration: musicTrack.duration,
        album: musicTrack.album,
        artist: musicTrack.artist,
        artwork: musicTrack.cover,
      }));

      await TrackPlayer.add(homeTracks);

      const trackIndex = allLocalMusicTracks.findIndex(
        (localMusicTrack) => localMusicTrack.url === musicFile.url
      );
      await TrackPlayer.skip(trackIndex);
      await TrackPlayer.play();
    }

    navigate("/player");
  };

  return (
    <View className="flex-row justify-between items-center rounded-md mb-4">
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
            {title}
          </Text>
          <Text className="text-secondaryText text-xs font-spacemono">
            {formatMusicFileDuration(duration)}
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

export default ListMusic;
