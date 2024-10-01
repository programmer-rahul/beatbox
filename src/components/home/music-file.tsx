import { View, Text, Pressable, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import COLORS from "@/constants/colors";
import { memo, useEffect, useState } from "react";
import useQueueStore, { queueStore } from "@/store/queue-store";
import useTrackStore, { trackStore } from "@/store/track-store";
import { playlistStore } from "@/store/playlist-store";
import { savedStore } from "@/store/saved-store";
import { TMusicTrack } from "@/types/store/track-store";
import { useRouter } from "expo-router";
import TrackPlayer from "react-native-track-player";
import { TQueueType } from "@/types/store/queue-store";

const MusicFile = memo(
  ({
    musicFile,
    lastFile,
    queueType,
    playlistName,
  }: {
    musicFile: TMusicTrack;
    index?: number;
    lastFile: boolean;
    queueType: TQueueType;
    playlistName?: string;
  }) => {
    const { setCurrentMusicTrack, setIsTrackPlaying, allCoverImages } =
      useTrackStore([
        "setCurrentMusicTrack",
        "setIsTrackPlaying",
        "allCoverImages",
      ]);
    const { setCurrentQueue } = useQueueStore(["setCurrentQueue"]);
    const { navigate } = useRouter();
    const [musicCover, setMusicCover] = useState("");

    console.log("inside music-file");

    const onMusicFilePress = async (
      musicFile: TMusicTrack,
      queueType: TQueueType,
    ) => {
      let currentSelectedQueueMusicFiles =
        queueType === "home"
          ? trackStore.getState().allLocalMusicTracks
          : queueType === "saved"
            ? savedStore.getState().allSavedMusicTracks
            : playlistStore
                .getState()
                .allPlaylists.find((playlist) => playlist.name === playlistName)
                ?.musicTracks || [];

      const currentMusicTrack = trackStore.getState().currentMusicTrack;
      const currentQueue = queueStore.getState().currentQueue;

      if (currentMusicTrack?.url !== musicFile.url) {
        // add songs in queue if queue is empty or selected queue is different one
        if (!currentQueue.tracksCount || currentQueue.type !== queueType) {
          await TrackPlayer.reset();
          await TrackPlayer.add(currentSelectedQueueMusicFiles);

          queueType !== "playlist"
            ? setCurrentQueue({
                type: queueType,
                tracksCount: currentSelectedQueueMusicFiles.length,
              })
            : setCurrentQueue({
                type: queueType,
                name: playlistName,
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

    useEffect(() => {
      if (musicFile.cover && allCoverImages[musicFile.url]) {
        const musicCover = allCoverImages[musicFile.url];
        setMusicCover(musicCover);
      }
    }, [allCoverImages]);

    return (
      <View
        className="mt-4 flex-row items-center justify-between rounded-md"
        style={{
          marginBottom: lastFile ? 120 : 0,
        }}
      >
        <Pressable
          className="flex-1 flex-row items-center space-x-2"
          onPress={() => onMusicFilePress(musicFile, queueType)}
        >
          <View
            className="aspect-square h-12 items-center justify-center rounded-md bg-main"
            style={{ backgroundColor: COLORS.main + "22" }}
          >
            {musicCover ? (
              <Image
                source={{ uri: musicCover }}
                className="h-full w-full rounded-md"
              />
            ) : (
              <Feather name="music" size={22} color={COLORS.main} />
            )}
          </View>

          <View className="flex-1 flex-row self-center">
            <MusicFileTitleArtistDisplay
              title={musicFile.title}
              artist={musicFile.artist}
            />
            <Text
              className="ml-2 self-center rounded-sm px-2 py-[2px] font-primary_semibold text-xs text-secondaryText"
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

const MusicFileTitleArtistDisplay = memo(
  ({ title, artist }: { title: string; artist: string }) => {
    const { currentMusicTrack } = useTrackStore(["currentMusicTrack"]);
    const isCurrentPlayingSong = currentMusicTrack?.title === title;

    return (
      <View className="flex-1 flex-col space-y-1">
        <Text
          className="flex-1 font-primary_semibold text-xs text-primaryText"
          numberOfLines={1}
          style={{
            color: isCurrentPlayingSong ? COLORS.main : COLORS.primaryText,
          }}
        >
          {title}
        </Text>
        <Text
          className="flex-1 font-primary_regular text-xs text-secondaryText"
          numberOfLines={1}
          style={{
            color: isCurrentPlayingSong ? COLORS.main : COLORS.secondaryText,
          }}
        >
          {artist}
        </Text>
      </View>
    );
  },
);
