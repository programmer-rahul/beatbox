import { View } from "react-native";

import ListMusicFiles from "@/components/home/list-music-files";
import useZustandStore from "@/store/zustand-store";
import SongPreviewBar from "@/components/home/tabs/song-preview-bar";
import NoMusicFilesFound from "@/components/home/no-music-files-found";
import PermissionRequired from "@/components/reusable/permission-required";
import usePermission from "@/hooks/usePermission";
import useTrackEvents from "@/hooks/useTrackEvents";

export default function HomeScreen() {
  const { allMusicFiles, isPermissionGranted, currentMusic } = useZustandStore(
    (state) => state
  );

  usePermission();

  return (
    <View className="flex flex-col h-full py-1 bg-primaryBg">
      {!isPermissionGranted ? (
        <PermissionRequired />
      ) : allMusicFiles.length < 0 ? (
        <NoMusicFilesFound />
      ) : (
        <>
          <ListMusicFiles
            musicFiles={allMusicFiles}
            heading="All Music Files"
          />
          {currentMusic && <SongPreviewBar />}
        </>
      )}
    </View>
  );
}
