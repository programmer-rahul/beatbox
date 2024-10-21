import { View } from "react-native";
import ListMusicFiles from "./../components/home/list-music-files";
import NoSavedMusicFiles from "./../components/saved/no-saved-music-files";
import COLORS from "./../constants/colors";
import ListMusicFilesHeader from "./../components/home/list-music-files-header";
import useZustandStore from "../store/useZustandStore";
import MiniMusicPlayer from "../components/home/tabs/mini-music-player";

const SavedScreen = () => {
  const allSavedMusicTracks = useZustandStore(
    (state) => state.allSavedMusicTracks,
  );

  return (
    <View
      className="flex h-full flex-col bg-primaryBg"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      {allSavedMusicTracks.length <= 0 && <NoSavedMusicFiles />}
      {allSavedMusicTracks.length > 0 && (
        <View className="flex-1">
          <View className="px-5">
            <ListMusicFilesHeader
              heading="Saved Music Files"
              musicFilesLength={allSavedMusicTracks.length}
            />

            <ListMusicFiles
              musicFiles={allSavedMusicTracks}
              queueType="saved"
            />
          </View>
          <MiniMusicPlayer />
        </View>
      )}
    </View>
  );
};

export default SavedScreen;
