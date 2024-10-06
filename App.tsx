import {useRef} from 'react';
import TabNavitation from './src/screens/TabNavitation';
import {NavigationContainer} from '@react-navigation/native';
import useSetupTrackPlayer from './src/hooks/useSetupTrackPlayer';
import TrackPlayer from 'react-native-track-player';
import playbackService from './src/lib/playback-service';
import PermissionRequired from './src/components/reusable/permission-required';
import usePermission from './src/hooks/usePermission';
import {StatusBar} from 'react-native';
import COLORS from './src/constants/colors';

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {
  const {isHavePermission} = usePermission();
  const isTrackPlayerInitialized = useRef(false);

  useSetupTrackPlayer({isTrackPlayerInitialized});

  return (
    <>
      {isHavePermission ? (
        <NavigationContainer>
          <TabNavitation />
        </NavigationContainer>
      ) : (
        <PermissionRequired />
      )}

      <StatusBar
        backgroundColor={COLORS.primaryBg}
        barStyle={'light-content'}
      />
    </>
  );
}

export default App;
