// import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTrackStore, {trackStore} from './../../../store/track-store';
import COLORS from './../../../constants/colors';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

function LoopMusicTrackIcon({size = 25}: {size?: number}) {
  const {isLoopingTrack, setIsLoopingTrack} = trackStore(state => state);

  return (
    // <MaterialCommunityIcons
    //   name="repeat-variant"
    //   size={size}
    //   color={isLoopingTrack ? COLORS.main + "cc" : COLORS.secondaryIcon}
    //   onPress={() => {
    //     setIsLoopingTrack(!isLoopingTrack);
    //     TrackPlayer.setRepeatMode(
    //       isLoopingTrack ? RepeatMode.Off : RepeatMode.Track,
    //     );
    //   }}
    // />
    null
  );
}

export default LoopMusicTrackIcon;
