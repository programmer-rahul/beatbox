import { View } from "react-native";
import ListMusicFiles from "@/components/home/list-music-files";
import NoSavedMusicFiles from "@/components/saved/no-saved-music-files";
import MiniMusicPlayer from "@/components/home/tabs/mini-music-player";
import useSavedStore from "@/store/saved-store";
import useTrackStore from "@/store/track-store";

const SavedScreen = () => {
  const { allSavedMusicTracks } = useSavedStore();
  const { currentMusicTrack } = useTrackStore();

  return (
    <View className="flex flex-col h-full py-1 bg-primaryBg">
      {allSavedMusicTracks.length <= 0 && <NoSavedMusicFiles />}
      {allSavedMusicTracks.length > 0 && (
        <View className="flex-1">
          <View>
            <ListMusicFiles
              musicFiles={allSavedMusicTracks}
              heading="Saved Music Files"
            />
          </View>
          {currentMusicTrack && <MiniMusicPlayer />}
        </View>
      )}
    </View>
  );
};

export default SavedScreen;
