import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MusicPlayerControls from "@/components/player/music-player-controls";
import useZustandStore from "@/store/zustand-store";
import PlayerScreenHeader from "@/components/player/player-screen-header";

const Index = () => {
  const {
    currentMusic,
    savedMusicsList,
    addMusicInSavedMusicList,
    removeMusicInSavedMusicList,
  } = useZustandStore();

  const checkIsSavedMusic = () => {
    if (!currentMusic) return false;
    return savedMusicsList.some((music) => music.musicId === currentMusic.id);
  };

  const [isSavedMusic, setIsSavedMusic] = useState(checkIsSavedMusic);

  useEffect(() => {
    setIsSavedMusic(checkIsSavedMusic);
  }, [currentMusic]);

  return (
    <SafeAreaView className="px-4 space-y-10">
      <PlayerScreenHeader />

      <View className="space-y-4">
        <View className="w-4/5 aspect-square rounded-full border border-lime-300 bg-lime-200/20 self-center my-10 items-center justify-center">
          <Feather name="music" size={180} color="#65a30d" />
        </View>
        {/* music name  */}
        <View className="flex-row justify-between items-center">
          <Text
            className="text-base font-semibold w-full max-w-[80%]"
            numberOfLines={1}
          >
            {currentMusic?.filename}
          </Text>
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
        </View>
      </View>

      <View>
        {currentMusic?.duration && (
          <MusicPlayerControls
            duration={currentMusic.duration}
            musicId={currentMusic.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;
