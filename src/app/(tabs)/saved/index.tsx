import { View } from "react-native";
import ListMusicFiles from "@/components/home/list-music-files";
import NoSavedMusicFiles from "@/components/saved/no-saved-music-files";
import MiniMusicPlayer from "@/components/home/tabs/mini-music-player";
import useSavedStore from "@/store/saved-store";
import COLORS from "@/constants/colors";

const SavedScreen = () => {
  const { allSavedMusicTracks } = useSavedStore(["allSavedMusicTracks"]);

  return (
    <View
      className="flex h-full flex-col bg-primaryBg py-1"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      {allSavedMusicTracks.length <= 0 && <NoSavedMusicFiles />}
      {allSavedMusicTracks.length > 0 && (
        <View className="flex-1">
          <View>
            <ListMusicFiles
              musicFiles={allSavedMusicTracks}
              heading="Saved Music Files"
            />
          </View>
          <MiniMusicPlayer />
        </View>
      )}
    </View>
  );
};

export default SavedScreen;
