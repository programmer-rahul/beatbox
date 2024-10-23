import { View } from "react-native";
import ListMusicFiles from "./../components/home/list-music-files";
import NoSavedMusicFiles from "./../components/saved/no-saved-music-files";
import COLORS from "./../constants/colors";
import useZustandStore from "../store/useZustandStore";
import MiniMusicPlayer from "../components/home/tabs/mini-music-player";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
  const allSavedMusicTracks = useZustandStore(
    (state) => state.allSavedMusicTracks,
  );

  return (
    <View
      className="flex-1 bg-primaryBg pb-12"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <SafeAreaView className="flex-1 pt-3">
        {allSavedMusicTracks.length > 0 ? (
          <View className="flex-1">
            <View className="px-5">
              <ListMusicFiles
                musicFiles={allSavedMusicTracks}
                queueType="saved"
                heading="Saved Music Files"
              />
            </View>
            <MiniMusicPlayer />
          </View>
        ) : (
          <NoSavedMusicFiles />
        )}
      </SafeAreaView>
    </View>
  );
};

export default SavedScreen;
