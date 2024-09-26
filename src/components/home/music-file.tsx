import { View, Text, Pressable, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import React, { memo, useState } from "react";
import useQueueStore, { queueStore } from "@/store/queue-store";
import useTrackStore, { trackStore } from "@/store/track-store";
import { TMusicTrack } from "@/types/store/track-store";
import { useRouter } from "expo-router";
import TrackPlayer from "react-native-track-player";

const MusicFile = React.memo(
  ({
    musicFile,
    lastFile,
  }: {
    musicFile: TMusicTrack;
    index?: number;
    lastFile: boolean;
  }) => {
    console.log("inside music file");

    const { allLocalMusicTracks, setCurrentMusicTrack, setIsTrackPlaying } =
      useTrackStore([
        "allLocalMusicTracks",
        "setCurrentMusicTrack",
        "setIsTrackPlaying",
      ]);
    const { setCurrentQueue } = useQueueStore(["setCurrentQueue"]);
    const { navigate } = useRouter();

    const onMusicFilePress = async (musicFile: TMusicTrack) => {
      if (trackStore.getState().currentMusicTrack?.url !== musicFile.url) {
        if (!queueStore.getState().currentQueue.tracksCount) {
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

      setCurrentMusicTrack(musicFile);
    };

    const [musicCover, setMusicCover] = useState("");

    return (
      <View
        className="mt-4 flex-row items-center justify-between rounded-md"
        style={{
          marginBottom: lastFile ? 50 : 0,
        }}
      >
        <Pressable
          className="flex-1 flex-row space-x-2"
          onPress={() => onMusicFilePress(musicFile)}
        >
          <View className="aspect-square h-10 items-center justify-center rounded-md bg-main/20">
            {musicCover.length ? (
              <Image
                source={{ uri: musicCover }}
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
