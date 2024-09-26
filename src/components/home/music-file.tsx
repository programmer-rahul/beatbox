import { View, Text, Pressable, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import { TMusicTrack } from "@/types/store/track-store";
import useTrackStore from "@/store/track-store";
import TrackPlayer from "react-native-track-player";
import useQueueStore from "@/store/queue-store";
import { useRouter } from "expo-router";
import React from "react";

const MusicFile = React.memo(
  ({
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
    const { navigate } = useRouter();

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
          (localMusicTrack) => localMusicTrack.url === musicFile.url,
        );

        await TrackPlayer.skip(trackIndex);
        await TrackPlayer.play();

        setIsTrackPlaying(true);
      } else {
        navigate("/player");
      }
    };

    return (
      <View
        className="mt-4 flex-row items-center justify-between rounded-md"
        style={{
          marginBottom: lastFile ? 50 : 0,
        }}
      >
        <Pressable
          className="flex-1 flex-row space-x-2"
          onPress={onMusicFilePress}
        >
          <View className="aspect-square h-10 items-center justify-center rounded-md border border-main bg-main/20">
            {musicFile.cover.length ? (
              <Image
                source={{ uri: musicFile.cover }}
                className="h-full w-full rounded-md"
              />
            ) : (
              <Feather name="music" size={22} color={COLORS.main} />
            )}
          </View>

          <View className="flex-1">
            <Text
              className="font-spacemono text-xs text-primaryText"
              numberOfLines={1}
            >
              {musicFile.title}
            </Text>
            <Text className="font-spacemono text-xs text-secondaryText">
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
  },
);

export default MusicFile;
