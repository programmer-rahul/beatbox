import { Heart } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable } from "react-native";
import useZustandStore from "../../store/useZustandStore";

const PlayerSavedMusicIcon = ({ size = 25 }: { size?: number }) => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const allSavedMusicTracks = useZustandStore(
    (state) => state.allSavedMusicTracks,
  );
  const addTrackInSavedMusic = useZustandStore(
    (state) => state.addTrackInSavedMusic,
  );
  const removeTrackInSavedMusic = useZustandStore(
    (state) => state.removeTrackInSavedMusic,
  );

  const scaleValue = useRef(new Animated.Value(1)).current;

  // check whether current song is saved song or not
  const checkIsSavedMusic = () => {
    if (!currentMusicTrack) return false;
    return allSavedMusicTracks.some(
      (savedMusic) => savedMusic.url === currentMusicTrack.url,
    );
  };

  // state for saved music
  const [isSavedMusic, setIsSavedMusic] = useState(checkIsSavedMusic);

  // check on initial render that current song is in saved song list or not
  useEffect(() => {
    setIsSavedMusic(checkIsSavedMusic);
  }, [currentMusicTrack]);

  const onSavedIconPress = () => {
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

    // Start the animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable onPress={onSavedIconPress}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Heart
          size={size}
          color={isSavedMusic ? COLORS.main : COLORS.secondaryIcon}
          fill={isSavedMusic ? COLORS.main : "transparent"}
        />
      </Animated.View>
    </Pressable>
  );
};

export default PlayerSavedMusicIcon;
