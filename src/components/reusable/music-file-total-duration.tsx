import {Text} from 'react-native';
import { trackStore } from '../../store/track-store';
import COLORS from '../../constants/colors';
import { formatMusicFileDuration } from '../../lib/helper';

function MusicFileTotalDuration() {
  const currentMusicTrack = trackStore(state => state.currentMusicTrack);

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
