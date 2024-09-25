import { Pressable, Text, View } from "react-native";
import ListMusicFiles from "@/components/home/list-music-files";
import NoMusicFilesFound from "@/components/home/no-music-files-found";
import useMusicTracks from "@/hooks/useMusicTracks";
import COLORS from "@/constants/colors";
import SongPreviewBar from "@/components/home/tabs/song-preview-bar";

export default function HomeScreen() {
  const { allLocalMusicTracks, currentMusicTrack } = useMusicTracks();

  return (
    <View
      className="flex flex-col h-full py-1"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      {allLocalMusicTracks.length <= 0 && <NoMusicFilesFound />}
      {allLocalMusicTracks.length > 0 && (
        <View>
          <ListMusicFiles
            musicFiles={allLocalMusicTracks}
            heading="All Music Files"
          />
          {currentMusicTrack && <SongPreviewBar />}
        </View>
      )}
    </View>
  );
}
