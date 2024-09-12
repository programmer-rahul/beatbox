import { View } from "react-native";
import { useEffect, useState } from "react";
import useZustandStore from "@/store/zustand-store";
import ListMusicFiles from "@/components/home/list-music-files";
import { TMusicFile } from "@/types/music";
import SongPreviewBar from "@/components/home/tabs/song-preview-bar";
import PermissionRequired from "@/components/reusable/permission-required";
import NoSavedMusicFiles from "@/components/saved/no-saved-music-files";

const SavedScreen = () => {
  const { savedMusicsList, isPermissionGranted, allMusicFiles, currentMusic } =
    useZustandStore();

  // saved music files list
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
      {!isPermissionGranted ? (
        <PermissionRequired />
      ) : savedMusicsList.length === 0 ? (
        <NoSavedMusicFiles />
      ) : (
        <>
          <ListMusicFiles
            musicFiles={allSavedMusicFiles}
            heading="All Saved Files"
          />
          {currentMusic && <SongPreviewBar />}
        </>
      )}
    </View>
  );
};

export default SavedScreen;
