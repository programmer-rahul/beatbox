import { Text, View } from "react-native";
import ListMusicFiles from "@/components/home/list-music-files";
import NoMusicFilesFound from "@/components/home/no-music-files-found";
import COLORS from "@/constants/colors";
import MiniMusicPlayer from "@/components/home/tabs/mini-music-player";
import useTrackStore from "@/store/track-store";
import useFetchLocalMusic from "@/hooks/useFetchLocalMusic";

export default function HomeScreen() {
  const { allLocalMusicTracks } = useTrackStore(["allLocalMusicTracks"]);

  const { isFetching } = useFetchLocalMusic();

  console.log("inside home page", allLocalMusicTracks.length);

  return !isFetching ? (
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
              queueType="home"
            />
          </View>
          <MiniMusicPlayer />
        </View>
      )}
    </View>
  ) : (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <Text className="text-2xl" style={{ color: COLORS.primaryText }}>
        Scanning Music Files
      </Text>
    </View>
  );
}
