import {useRef} from 'react';
import TabNavitation from './src/screens/TabNavitation';
import {NavigationContainer} from '@react-navigation/native';
import useSetupTrackPlayer from './src/hooks/useSetupTrackPlayer';
import TrackPlayer from 'react-native-track-player';
import playbackService from './src/lib/playback-service';

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {
  const isTrackPlayerInitialized = useRef(false);

  useSetupTrackPlayer({isTrackPlayerInitialized});

  return (
    <NavigationContainer>
      <TabNavitation />
    </NavigationContainer>
  );
}

export default App;
