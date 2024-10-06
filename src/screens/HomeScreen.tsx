import {Text, View, ActivityIndicator} from 'react-native';

import {trackStore} from '../store/track-store';
import ListMusicFiles from './../components/home/list-music-files';
import ListMusicFilesHeader from './../components/home/list-music-files-header';
import NoMusicFilesFound from './../components/home/no-music-files-found';
import MountOnMusicTrackFinish from './../components/mount-on-music-track-finish';
import COLORS from '../constants/colors';
import useFetchLocalMusic from './../hooks/useFetchLocalMusic';
import useInitialQueue from './../hooks/useInitialQueue';
import Header from '../components/header/header';

const HomeScreen = () => {
  const allLocalMusicTracks = trackStore(state => state.allLocalMusicTracks);
  const allLocalMusicTracksLength = allLocalMusicTracks.length;

  const {isFetching} = useFetchLocalMusic();
  useInitialQueue();

  console.log('INSIDE HOME_PAGE');

  return !isFetching ? (
    <View
      className="flex flex-1 flex-col py-1"
      style={{backgroundColor: COLORS.primaryBg}}>
      {allLocalMusicTracksLength <= 0 && <NoMusicFilesFound />}
      {allLocalMusicTracksLength > 0 && (
        <View className="flex-1">
          <Header />
          <View className="px-5">
            <ListMusicFilesHeader
              heading="All Music Files"
              musicFilesLength={allLocalMusicTracksLength}
            />
            <ListMusicFiles musicFiles={allLocalMusicTracks} queueType="home" />
          </View>
        </View>
      )}

      <MountOnMusicTrackFinish />
    </View>
  ) : (
    <View
      className="flex-1 items-center justify-center space-y-4"
      style={{backgroundColor: COLORS.primaryBg}}>
      <Text className="text-2xl" style={{color: COLORS.primaryText}}>
        Scanning Music Files
      </Text>
      <ActivityIndicator size={'large'} color={COLORS.main} />
    </View>
  );
};

export default HomeScreen;
