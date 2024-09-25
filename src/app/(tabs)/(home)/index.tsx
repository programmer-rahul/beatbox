import { View } from "react-native";
import ListMusicFiles from "@/components/home/list-music-files";
import NoMusicFilesFound from "@/components/home/no-music-files-found";
import useMusicTracks from "@/hooks/useMusicTracks";
import COLORS from "@/constants/colors";
import MiniMusicPlayer from "@/components/home/tabs/mini-music-player";

export default function HomeScreen() {
  const { allLocalMusicTracks, currentMusicTrack } = useMusicTracks();
  return (
    <View
      className="flex flex-col flex-1 py-1"
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
          {currentMusicTrack && <MiniMusicPlayer />}
        </View>
      )}
    </View>
  );
}
