import useZustandStore from "@/store/zustand-store";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

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
    <AntDesign
      name={isSavedMusic ? "heart" : "hearto"}
      size={22}
      color="#65a30d"
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
  );
};

export default PlayerSavedMusicIcon;
