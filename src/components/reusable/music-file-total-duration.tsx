import COLORS from '@/constants/colors';
import {formatMusicFileDuration} from '@/lib/helper';
import {Text} from 'react-native';
import useTrackStore, {trackStore} from '@/store/track-store';

function MusicFileTotalDuration() {
  const {currentMusicTrack} = trackStore(state => state);

  console.log('INSIDE MUSIC_FILE_TOTAL_DURATION');

  if (!currentMusicTrack) return;
  return (
    <Text
      className="font-primary_regular text-xs text-secondaryText"
      style={{
        color: COLORS.secondaryText,
      }}>
      {formatMusicFileDuration(currentMusicTrack.duration, 'milliseconds')}
    </Text>
  );
}

export default MusicFileTotalDuration;
