import {useRef} from 'react';
import TabNavitation from './src/screens/TabNavitation';
import {NavigationContainer} from '@react-navigation/native';
import useSetupTrackPlayer from './src/hooks/useSetupTrackPlayer';
import TrackPlayer from 'react-native-track-player';
import playbackService from './src/lib/playback-service';
import PermissionRequired from './src/components/reusable/permission-required';
import usePermission from './src/hooks/usePermission';

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {

  const {isHavePermission} = usePermission();
  const isTrackPlayerInitialized = useRef(false);

  useSetupTrackPlayer({isTrackPlayerInitialized});

  return  isHavePermission ? (
    <NavigationContainer>
      <TabNavitation />
    </NavigationContainer>
  )  : (
    <PermissionRequired />
  );
}

export default App;
