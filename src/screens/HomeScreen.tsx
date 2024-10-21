import { View } from "react-native";

import ListMusicFiles from "./../components/home/list-music-files";
import ListMusicFilesHeader from "./../components/home/list-music-files-header";
import NoMusicFilesFound from "./../components/home/no-music-files-found";
import MountOnMusicTrackFinish from "./../components/mount-on-music-track-finish";
import COLORS from "../constants/colors";
import useFetchLocalMusic from "./../hooks/useFetchLocalMusic";
import useInitialQueue from "./../hooks/useInitialQueue";
import Header from "../components/header/header";
import useZustandStore from "../store/useZustandStore";
import ScanningMusicFiles from "../components/reusable/scanning-music-files";
import MiniMusicPlayer from "../components/home/tabs/mini-music-player";

const HomeScreen = () => {
  const allLocalMusicTracks = useZustandStore(
    (state) => state.allLocalMusicTracks,
  );

  const { isFetching } = useFetchLocalMusic();
  useInitialQueue();

  const allLocalMusicTracksLength = allLocalMusicTracks.length;
  console.log("INSIDE HOME_PAGE");

  return !isFetching ? (
    <View
      className="flex flex-1 flex-col"
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      {allLocalMusicTracksLength <= 0 && <NoMusicFilesFound />}
      {allLocalMusicTracksLength > 0 && (
        <View className="flex-1">
          <Header />
          <View className="px-5">
            <ListMusicFilesHeader
              heading="All Music Files"
              musicFilesLength={allLocalMusicTracksLength}
            />
            <ListMusicFiles musicFiles={allLocalMusicTracks} queueType="home" />
          </View>
          <MiniMusicPlayer />
          <MountOnMusicTrackFinish />
        </View>
      )}
    </View>
  ) : (
    <ScanningMusicFiles />
  );
};

export default HomeScreen;
