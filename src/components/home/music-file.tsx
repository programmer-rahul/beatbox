import { View, Text, Pressable, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import React, { useState } from "react";
import useQueueStore, { queueStore } from "@/store/queue-store";
import useTrackStore, { trackStore } from "@/store/track-store";
import { savedStore } from "@/store/saved-store";
import { TMusicTrack } from "@/types/store/track-store";
import { usePathname, useRouter } from "expo-router";
import TrackPlayer from "react-native-track-player";
import { TQueueType } from "@/types/store/queue-store";

const MusicFile = React.memo(
  ({
    musicFile,
    lastFile,
  }: {
    musicFile: TMusicTrack;
    index?: number;
    lastFile: boolean;
  }) => {
    const { setCurrentMusicTrack, setIsTrackPlaying } = useTrackStore([
      "setCurrentMusicTrack",
      "setIsTrackPlaying",
    ]);
    const { setCurrentQueue } = useQueueStore(["setCurrentQueue"]);
    const { navigate } = useRouter();
    const pathname = usePathname();

    const onMusicFilePress = async (
      musicFile: TMusicTrack,
      queueType: TQueueType,
    ) => {
      const currentSelectedQueueMusicFiles =
        queueType === "home"
          ? trackStore.getState().allLocalMusicTracks
          : savedStore.getState().allSavedMusicTracks;
      const currentMusicTrack = trackStore.getState().currentMusicTrack;
      const currentQueue = queueStore.getState().currentQueue;

      if (currentMusicTrack?.url !== musicFile.url) {
        if (!currentQueue.tracksCount || currentQueue.type !== queueType) {
          await TrackPlayer.reset();
          await TrackPlayer.add(currentSelectedQueueMusicFiles);

          setCurrentQueue({
            type: queueType,
            tracksCount: currentSelectedQueueMusicFiles.length,
          });
        }

        let trackIndex = currentSelectedQueueMusicFiles.findIndex(
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

    const [musicCover] = useState("");

    return (
      <View
        className="mt-4 flex-row items-center justify-between rounded-md"
        style={{
          marginBottom: lastFile ? 120 : 0,
        }}
      >
        <Pressable
          className="flex-1 flex-row items-center space-x-2"
          onPress={() =>
            onMusicFilePress(
              musicFile,
              pathname === "/saved" ? "saved" : "home",
            )
          }
        >
          <View
            className="aspect-square h-10 items-center justify-center rounded-md bg-main"
            style={{ backgroundColor: COLORS.main + "22" }}
          >
            {musicCover.length ? (
              <Image
                source={{ uri: musicCover }}
                className="h-full w-full rounded-md"
              />
            ) : (
              <Feather name="music" size={22} color={COLORS.main} />
            )}
          </View>

          <View className="flex-1 flex-row items-center self-center">
            <View className="flex flex-1 justify-center">
              <Text
                className="flex-1 font-spacemono text-xs text-primaryText"
                numberOfLines={1}
                style={{
                  color: COLORS.primaryText,
                }}
              >
                {musicFile.title}
              </Text>
              <Text
                className="flex-1 font-spacemono text-xs text-primaryText"
                numberOfLines={1}
                style={{
                  color: COLORS.secondaryText,
                }}
              >
                {musicFile.artist}
              </Text>
            </View>
            <Text
              className="ml-2 rounded-md px-2 py-[2px] font-spacemono text-xs text-secondaryText"
              style={{
                color: COLORS.primaryText + "66",
                backgroundColor: COLORS.secondaryText + "33",
              }}
            >
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
