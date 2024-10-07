import { View, Text, Pressable } from "react-native";
import { formatMusicFileDuration } from "./../../lib/helper";
import COLORS from "./../../constants/colors";
import { memo } from "react";
import TrackPlayer from "react-native-track-player";
import MusicFileAlbumDisplay from "../reusable/music-file-album-display";
import { EllipsisVertical } from "lucide-react-native";
import { TQueueType } from "../../types/store/slices/queue-slice";
import { TMusicTrack } from "../../types/store/slices/track-slice";
import useZustandStore from "../../store/useZustandStore";

const MusicFile = ({
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
  const setCurrentMusicTrack = useZustandStore(
    (state) => state.setCurrentMusicTrack,
  );
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);

  const setCurrentQueue = useZustandStore((state) => state.setCurrentQueue);
  // const { navigate } = useRouter();

  console.log("INSIDE MUSIC_FILE");

  const onMusicFilePress = async (
    musicFile: TMusicTrack,
    queueType: TQueueType,
  ) => {
    let currentSelectedQueueMusicFiles =
      queueType === "home"
        ? useZustandStore.getState().allLocalMusicTracks
        : queueType === "saved"
          ? useZustandStore.getState().allSavedMusicTracks
          : useZustandStore
              .getState()
              .allPlaylists.find((playlist) => playlist.name === playlistName)
              ?.musicTracks || [];

    const currentMusicTrack = useZustandStore.getState().currentMusicTrack;
    const currentQueue = useZustandStore.getState().currentQueue;

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
      // navigate("/player");
    }

    setCurrentMusicTrack(musicFile);
  };

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
        <MusicFileAlbumDisplay
          title={musicFile.title}
          cover={musicFile.cover}
        />

        <View className="flex-1 flex-row self-center">
          <MusicFileTitleArtistDisplay
            title={musicFile.title}
            artist={musicFile.artist}
          />
          <MusicFileTotalDurationBox duration={musicFile.duration} />
        </View>
      </Pressable>
      <MusicFileMenuBarIcon />
    </View>
  );
};

export default memo(MusicFile);

const MusicFileTitleArtistDisplay = memo(
  ({ title, artist }: { title: string; artist: string }) => {
    const currentMusicTrack = useZustandStore(
      (state) => state.currentMusicTrack,
    );
    const isCurrentPlayingSong = currentMusicTrack?.title === title;

    // console.log("INSIDE MUSIC_FILE_TITLE_ARTIST_DISPLAY");

    return (
      <View className="flex-1 flex-col space-y-1">
        <Text
          className="font-primary_semibold flex-1 text-xs text-primaryText"
          numberOfLines={1}
          style={{
            color: isCurrentPlayingSong ? COLORS.main : COLORS.primaryText,
          }}
        >
          {title}
        </Text>
        <Text
          className="font-primary_regular flex-1 text-xs text-secondaryText"
          numberOfLines={1}
          style={{
            color: isCurrentPlayingSong
              ? COLORS.main + "aa"
              : COLORS.secondaryText,
          }}
        >
          {artist}
        </Text>
      </View>
    );
  },
);

const MusicFileTotalDurationBox = ({ duration }: { duration: number }) => {
  console.log("INSIDE MUSIC_FILE_TOTAL_DURATION_BOX");
  return (
    <Text
      className="font-primary_semibold ml-2 self-center rounded-sm px-2 py-[2px] text-xs text-secondaryText"
      style={{
        color: COLORS.primaryText + "66",
        backgroundColor: COLORS.secondaryText + "33",
      }}
    >
      {formatMusicFileDuration(duration, "milliseconds")}
    </Text>
  );
};

const MusicFileMenuBarIcon = memo(() => {
  return (
    <View>
      <EllipsisVertical color={COLORS.secondaryIcon} />
    </View>
  );
});
