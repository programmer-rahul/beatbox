import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import useZustandStore from "@/store/zustand-store";
import ListMusicFiles from "@/components/home/list-music-files";
import { TMusicFile } from "@/types/music";
import AntDesign from "@expo/vector-icons/AntDesign";
import SongPreviewBar from "@/components/home/tabs/song-preview-bar";

const SavedScreen = () => {
  const { savedMusicsList, isPermissionGranted, allMusicFiles, currentMusic } =
    useZustandStore();

  const [allSavedMusicFiles, setAllSavedMusicFiles] = useState<TMusicFile[]>(
    []
  );

  useEffect(() => {
    if (isPermissionGranted && allMusicFiles.length > 0) {
      const savedMusicFiles = allMusicFiles.filter((musicFile) =>
        savedMusicsList.some(
          (savedMusic) => savedMusic.musicId === musicFile.id
        )
      );
      setAllSavedMusicFiles(savedMusicFiles);
    }
  }, [savedMusicsList]);

  return (
    <View className="flex flex-col h-full py-1 ">
      {currentMusic && <SongPreviewBar />}
      {isPermissionGranted && savedMusicsList.length > 0 ? (
        <ListMusicFiles
          musicFiles={allSavedMusicFiles}
          heading={"All Saved Music Files"}
        />
      ) : (
        <View className="flex-row gap-2 items-center justify-center h-full">
          <Text className="text-2xl font-semibold">No Saved Music Files</Text>
          <AntDesign name="hearto" size={30} color="#65a30d" />
        </View>
      )}
    </View>
  );
};

export default SavedScreen;
