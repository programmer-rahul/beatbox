import COLORS from './../../constants/colors';
import {Text} from 'react-native';
import useTrackStore, {trackStore} from './../../store/track-store';

function MusicFileTitle({
  title,
  text = 'small',
}: {
  title?: string;
  text: 'small' | 'big';
}) {
  const {currentMusicTrack} = trackStore(state => state);
  console.log('INSIDE MUSIC_FILE_TITLE');

  if (!title && !currentMusicTrack) return;
  return (
    <Text
      className={`font-primary_semibold ${
        text === 'small' ? 'text-xs' : 'text-base'
      } text-primaryText`}
      numberOfLines={1}
      style={{
        color: COLORS.primaryBg,
      }}>
      {title ?? currentMusicTrack?.title}
    </Text>
  );
}

export default MusicFileTitle;
