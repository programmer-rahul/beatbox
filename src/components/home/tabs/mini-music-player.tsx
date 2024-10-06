import {Pressable, Text, View} from 'react-native';
import { trackStore } from '../../../store/track-store';
import { useProgress } from 'react-native-track-player';
import COLORS from '../../../constants/colors';
import DisplayCurrentMusicPosition from '../../reusable/display-current-music-position';
import PlayPauseMusicIcon from '../../reusable/icons/play-pause-music-icon';
import PlayPreviusNextMusicIcon from '../../reusable/icons/play-previus-next-music-icon';
import MusicFileAlbumDisplayOnTrackChange from '../../reusable/music-file-album-display-on-trackchange';
import MusicFileTitle from '../../reusable/music-file-title';
import MusicFileTotalDuration from '../../reusable/music-file-total-duration';

const MiniMusicPlayer = () => {
  const currentMusicTrack = trackStore(state => state.currentMusicTrack);
  // const { navigate } = useRouter();

  console.log('INSIDE MINI_MUSIC_MUSIC_PLAYER');

  return currentMusicTrack ? (
    <View
      className="absolute bottom-12 z-10 h-14 w-full rounded-t-xl"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}>
      <View
        className="h-full w-full items-center justify-center rounded-t-xl"
        style={{
          backgroundColor: COLORS.secondaryBg,
        }}>
        <View className="w-full flex-row items-center justify-between gap-2 pl-6 pr-2">
          <Pressable
            className="flex-1 flex-row items-center space-x-2"
            onPress={() => {}}>
            <MusicFileAlbumDisplayOnTrackChange size="small" />
            <View className="flex-1">
              <MusicFileTitle text="small" />
              <View className="flex-row items-center">
                <DisplayCurrentMusicPosition />
                <Text
                  className="font-primary_regular text-xs text-secondaryText"
                  style={{
                    color: COLORS.secondaryText,
                  }}>
                  :
                </Text>
                <MusicFileTotalDuration />
              </View>
            </View>
          </Pressable>
          <View className="flex-row items-center">
            <PlayPauseMusicIcon size={40} />
            <View className="ml-2">
              <PlayPreviusNextMusicIcon type="next" />
            </View>
          </View>
        </View>
        <MusicFileRemainingDurationVisual />
      </View>
    </View>
  ) : null;
};

export default MiniMusicPlayer;

const MusicFileRemainingDurationVisual = () => {
  const progress = useProgress();
  const currentMusicTrack = trackStore(state => state.currentMusicTrack);
  
  return currentMusicTrack ? (
    <View className="absolute -z-10 flex h-full w-full justify-end">
      <View
        className="h-[6%] self-start"
        style={{
          backgroundColor: COLORS.main + 'aa',
          width: `${Math.floor(
            (progress.position / (currentMusicTrack?.duration / 1000)) * 100,
          )}%`,
        }}
      />
    </View>
  ) : null;
};
