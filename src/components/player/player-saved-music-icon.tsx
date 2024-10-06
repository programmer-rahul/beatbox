import { Heart } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { savedStore } from "./../../store/saved-store";
import { trackStore } from "./../../store/track-store";
import { useEffect, useState } from "react";
import { View } from "react-native";

const PlayerSavedMusicIcon = ({ size = 25 }: { size?: number }) => {
  const currentMusicTrack = trackStore((state) => state.currentMusicTrack);
  const allSavedMusicTracks = savedStore((state) => state.allSavedMusicTracks);
  const addTrackInSavedMusic = savedStore(
    (state) => state.addTrackInSavedMusic,
  );
  const removeTrackInSavedMusic = savedStore(
    (state) => state.removeTrackInSavedMusic,
  );

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
  };

  return (
    <View>
      <Heart
        size={size}
        color={isSavedMusic ? COLORS.main : COLORS.secondaryIcon}
        onPress={onSavedIconPress}
        fill={isSavedMusic ? COLORS.main : "transparent"}
      />
    </View>
  );
};

export default PlayerSavedMusicIcon;
