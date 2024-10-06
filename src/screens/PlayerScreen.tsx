import {Text, View} from 'react-native';
import useTrackStore, {trackStore} from '../store/track-store';
// import {Feather} from '@expo/vector-icons';
// import { Link } from "expo-router";
import {memo} from 'react';
import PlayerScreenHeader from './../components/player/player-screen-header';
import PlayerScreenView from './../components/player/player-screen-view';
import COLORS from '../constants/colors';

const PlayerScreen = () => {
  const currentMusicTrack = trackStore(state => state.currentMusicTrack);

  console.log('inside player screen');

  return (
    <View
      className="flex-1 space-y-10 bg-primaryBg px-4"
      style={{
        backgroundColor: COLORS.secondaryBg,
      }}>
      {currentMusicTrack ? (
        <View className="flex-1">
          <PlayerScreenHeader />
          <PlayerScreenView />
        </View>
      ) : (
        <NoMusicFileSelected />
      )}
    </View>
  );
};

export default memo(PlayerScreen);

const NoMusicFileSelected = () => {
  console.log('INSIDE NO MUSIC_FILE_SELECTED');

  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-4">
        <Text className="text-center font-primary_regular text-3xl">
          No Music File Selected Right Now
        </Text>
        {/* <Link
          href="/(home)"
          className="rounded-md bg-main px-3 py-1 font-primary_semibold text-xl"
          style={{
            color: COLORS.primaryBg,
            backgroundColor: COLORS.main + "aa",
          }}
        >
          Play Now
        </Link> */}
      </View>
      <View className="absolute -z-10 opacity-10">
        {/* <Feather name="music" size={320} color={COLORS.main} /> */}
      </View>
    </View>
  );
};
