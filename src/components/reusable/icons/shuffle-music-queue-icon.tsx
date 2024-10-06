import useTrackStore, {trackStore} from './../../../store/track-store';
import COLORS from './../../../constants/colors';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

function ShuffleMusicQueueIcon({size = 25}: {size?: number}) {
  const {isShufflingQueue, setIsShufflingQueue} = trackStore(state => state);

  return (
    // <MaterialCommunityIcons
    //   name="shuffle"
    //   size={size}
    //   color={isShufflingQueue ? COLORS.main + "cc" : COLORS.secondaryIcon}
    //   onPress={() => {
    //     setIsShufflingQueue(!isShufflingQueue);
    //     TrackPlayer.setRepeatMode(
    //       isShufflingQueue ? RepeatMode.Off : RepeatMode.Queue,
    //     );
    //   }}
    // />
    null
  );
}

export default ShuffleMusicQueueIcon;
