import COLORS from "@/constants/colors";
import useZustandStore from "@/store/zustand-store";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";

const PlayerSavedMusicIcon = () => {
  const {
    currentMusic,
    savedMusicsList,
    addMusicInSavedMusicList,
    removeMusicInSavedMusicList,
  } = useZustandStore();

  // check whether current song is saved song or not
  const checkIsSavedMusic = () => {
    if (!currentMusic) return false;
    return savedMusicsList.some((music) => music.musicId === currentMusic.id);
  };

  // state for saved music
  const [isSavedMusic, setIsSavedMusic] = useState(checkIsSavedMusic);

  // check on initial render that current song is in saved song list or not
  useEffect(() => {
    setIsSavedMusic(checkIsSavedMusic);
  }, [currentMusic]);
  return (
    <View>
      <AntDesign
        name={isSavedMusic ? "heart" : "hearto"}
        size={22}
        color={COLORS.main}
        onPress={() => {
          if (!currentMusic) return;

          // manage global state for saved musics
          if (isSavedMusic) {
            removeMusicInSavedMusicList(currentMusic.id);
          } else {
            addMusicInSavedMusicList(currentMusic.id);
          }

          // for ui perpose
          setIsSavedMusic(!isSavedMusic);
        }}
      />
    </View>
  );
};

export default PlayerSavedMusicIcon;
