import { View } from "react-native";

import ListMusicFiles from "./../components/home/list-music-files";
import NoMusicFilesFound from "./../components/home/no-music-files-found";
import MountOnMusicTrackFinish from "./../components/mount-on-music-track-finish";
import COLORS from "../constants/colors";
import useFetchLocalMusic from "./../hooks/useFetchLocalMusic";
import useInitialQueue from "./../hooks/useInitialQueue";
import Header from "../components/header/header";
import useZustandStore from "../store/useZustandStore";
import ScanningMusicFiles from "../components/reusable/scanning-music-files";
import MiniMusicPlayer from "../components/home/tabs/mini-music-player";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const allLocalMusicTracks = useZustandStore(
    (state) => state.allLocalMusicTracks,
  );

  const { isFetching } = useFetchLocalMusic();
  useInitialQueue();

  const allLocalMusicTracksLength = allLocalMusicTracks.length;
  console.log("INSIDE HOME_PAGE");

  return (
    <View
      className="flex-1 bg-primaryBg pb-12"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <SafeAreaView className="flex-1">
        {!isFetching ? (
          <>
            {allLocalMusicTracksLength > 0 ? (
              <View className="flex-1">
                <Header />
                <View className="flex-1 px-5">
                  {/* <ListMusicFiles
                    heading={"All Music Files"}
                    musicFiles={allLocalMusicTracks}
                    queueType="home"
                  /> */}
                </View>
                <MiniMusicPlayer />
                <MountOnMusicTrackFinish />
              </View>
            ) : (
              <NoMusicFilesFound />
            )}
          </>
        ) : (
          <ScanningMusicFiles />
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
