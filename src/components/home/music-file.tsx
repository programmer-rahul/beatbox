import {View, Text, Pressable} from 'react-native';
// import Entypo from "@expo/vector-icons/Entypo";
import {formatMusicFileDuration} from './../../lib/helper';
import COLORS from './../../constants/colors';
import {memo} from 'react';
import useQueueStore, {queueStore} from './../../store/queue-store';
import useTrackStore, {trackStore} from './../../store/track-store';
import {playlistStore} from './../../store/playlist-store';
import {savedStore} from './../../store/saved-store';
import {TMusicTrack} from './../../types/store/track-store';
// import { useRouter } from "expo-router";
import TrackPlayer from 'react-native-track-player';
import {TQueueType} from './../../types/store/queue-store';
import MusicFileAlbumDisplay from '../reusable/music-file-album-display';

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
  const {setCurrentMusicTrack, setIsTrackPlaying} = trackStore(state => state);
  const {setCurrentQueue} = queueStore(state => state);
  // const { navigate } = useRouter();

  console.log('INSIDE MUSIC_FILE');

  const onMusicFilePress = async (
    musicFile: TMusicTrack,
    queueType: TQueueType,
  ) => {
    let currentSelectedQueueMusicFiles =
      queueType === 'home'
        ? trackStore.getState().allLocalMusicTracks
        : queueType === 'saved'
        ? savedStore.getState().allSavedMusicTracks
        : playlistStore
            .getState()
            .allPlaylists.find(playlist => playlist.name === playlistName)
            ?.musicTracks || [];

    const currentMusicTrack = trackStore.getState().currentMusicTrack;
    const currentQueue = queueStore.getState().currentQueue;

    if (currentMusicTrack?.url !== musicFile.url) {
      // add songs in queue if queue is empty or selected queue is different one
      if (!currentQueue.tracksCount || currentQueue.type !== queueType) {
        await TrackPlayer.reset();
        await TrackPlayer.add(currentSelectedQueueMusicFiles);

        queueType !== 'playlist'
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
        localMusicTrack => localMusicTrack.url === musicFile.url,
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
      }}>
      <Pressable
        className="flex-1 flex-row items-center space-x-2"
        onPress={() => onMusicFilePress(musicFile, queueType)}>
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
  ({title, artist}: {title: string; artist: string}) => {
    const {currentMusicTrack} = trackStore(state => state);
    const isCurrentPlayingSong = currentMusicTrack?.title === title;

    // console.log("INSIDE MUSIC_FILE_TITLE_ARTIST_DISPLAY");

    return (
      <View className="flex-1 flex-col space-y-1">
        <Text
          className="flex-1 font-primary_semibold text-xs text-primaryText"
          numberOfLines={1}
          style={{
            color: isCurrentPlayingSong ? COLORS.main : COLORS.primaryText,
          }}>
          {title}
        </Text>
        <Text
          className="flex-1 font-primary_regular text-xs text-secondaryText"
          numberOfLines={1}
          style={{
            color: isCurrentPlayingSong
              ? COLORS.main + 'aa'
              : COLORS.secondaryText,
          }}>
          {artist}
        </Text>
      </View>
    );
  },
);

const MusicFileTotalDurationBox = ({duration}: {duration: number}) => {
  console.log('INSIDE MUSIC_FILE_TOTAL_DURATION_BOX');
  return (
    <Text
      className="ml-2 self-center rounded-sm px-2 py-[2px] font-primary_semibold text-xs text-secondaryText"
      style={{
        color: COLORS.primaryText + '66',
        backgroundColor: COLORS.secondaryText + '33',
      }}>
      {formatMusicFileDuration(duration, 'milliseconds')}
    </Text>
  );
};

const MusicFileMenuBarIcon = memo(() => {
  return (
    <View>
      {/* <Entypo
        name="dots-three-vertical"
        size={20}
        color={COLORS.secondaryIcon}
      /> */}
    </View>
  );
});
