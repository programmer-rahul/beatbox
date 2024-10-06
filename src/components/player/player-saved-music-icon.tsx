import COLORS from './../../constants/colors';
import useSavedStore, {savedStore} from './../../store/saved-store';
import useTrackStore, {trackStore} from './../../store/track-store';
// import {AntDesign} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import {View} from 'react-native';

const PlayerSavedMusicIcon = ({size = 25}: {size?: number}) => {
  const {currentMusicTrack} = trackStore(state => state);
  const {allSavedMusicTracks, addTrackInSavedMusic, removeTrackInSavedMusic} =
    savedStore(state => state);

  // check whether current song is saved song or not
  const checkIsSavedMusic = () => {
    if (!currentMusicTrack) return false;
    return allSavedMusicTracks.some(
      savedMusic => savedMusic.url === currentMusicTrack.url,
    );
  };

  // state for saved music
  const [isSavedMusic, setIsSavedMusic] = useState(checkIsSavedMusic);

  // check on initial render that current song is in saved song list or not
  useEffect(() => {
    setIsSavedMusic(checkIsSavedMusic);
  }, [currentMusicTrack]);

  return (
    <View>
      {/* <AntDesign
        name={isSavedMusic ? 'heart' : 'hearto'}
        size={size}
        color={COLORS.main}
        onPress={() => {
          if (!currentMusicTrack) return;

          // manage global state for saved musics
          if (isSavedMusic) {
            // removeMusicInSavedMusicLis(currentMusic.id);
            removeTrackInSavedMusic(currentMusicTrack.url);
          } else {
            // addMusicInSavedMusicList(currentMusic.id);
            addTrackInSavedMusic(currentMusicTrack);
          }

          // for ui perpose
          setIsSavedMusic(!isSavedMusic);
        }}
      /> */}
    </View>
  );
};

export default PlayerSavedMusicIcon;
