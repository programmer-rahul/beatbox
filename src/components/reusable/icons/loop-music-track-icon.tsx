// import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTrackStore, {trackStore} from './../../../store/track-store';
import COLORS from './../../../constants/colors';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import { Repeat2 } from 'lucide-react-native';

function LoopMusicTrackIcon({size = 25}: {size?: number}) {
  const isLoopingTrack = trackStore(state => state.isLoopingTrack);
  const setIsLoopingTrack = trackStore(state => state.setIsLoopingTrack);

  return (
    <Repeat2
      size={size}
      color={isLoopingTrack ? COLORS.main + "cc" : COLORS.secondaryIcon}
      onPress={() => {
        setIsLoopingTrack(!isLoopingTrack);
        TrackPlayer.setRepeatMode(
          isLoopingTrack ? RepeatMode.Off : RepeatMode.Track,
        );
      }}
    />
  );
}

export default LoopMusicTrackIcon;
