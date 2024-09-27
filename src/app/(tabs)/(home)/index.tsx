import { View } from "react-native";
import ListMusicFiles from "@/components/home/list-music-files";
import NoMusicFilesFound from "@/components/home/no-music-files-found";
import COLORS from "@/constants/colors";
import MiniMusicPlayer from "@/components/home/tabs/mini-music-player";
import useTrackStore from "@/store/track-store";
import useFetchLocalMusic from "@/hooks/useFetchLocalMusic";

export default function HomeScreen() {
  const { allLocalMusicTracks } = useTrackStore(["allLocalMusicTracks"]);
  useFetchLocalMusic();
  console.log("inside home page");

  return (
    <View
      className="flex flex-1 flex-col py-1"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      {allLocalMusicTracks.length <= 0 && <NoMusicFilesFound />}
      {allLocalMusicTracks.length > 0 && (
        <View className="flex-1">
          <View>
            <ListMusicFiles
              musicFiles={allLocalMusicTracks}
              heading="All Music Files"
            />
          </View>
          <MiniMusicPlayer />
        </View>
      )}
    </View>
  );
}
