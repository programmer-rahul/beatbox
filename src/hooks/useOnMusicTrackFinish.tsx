import {useEffect} from 'react';
import {useActiveTrack, useProgress} from 'react-native-track-player';
import {trackStore} from './../store/track-store';

const onMusicTrackFinish = () => {
  const currentTrack = useActiveTrack();
  const progress = useProgress();

  const changeCurrentMusicTrack = trackStore(state => state.changeCurrentMusicTrack);

  useEffect(() => {
    const currentMusicTrack = trackStore.getState().currentMusicTrack;

    if (progress.position >= progress.duration && currentMusicTrack) {
      console.log('TRACK FINISHED');
      currentMusicTrack?.title !== currentTrack?.title &&
        changeCurrentMusicTrack('next');
    }
  }, [progress]);
};

export default onMusicTrackFinish;
