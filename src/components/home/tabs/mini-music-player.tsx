import { Pressable, Text, View } from "react-native";
import { useProgress } from "react-native-track-player";
import COLORS from "../../../constants/colors";
import DisplayCurrentMusicPosition from "../../reusable/display-current-music-position";
import PlayPauseMusicIcon from "../../reusable/icons/play-pause-music-icon";
import PlayPreviusNextMusicIcon from "../../reusable/icons/play-previus-next-music-icon";
import MusicFileAlbumDisplayOnTrackChange from "../../reusable/music-file-album-display-on-trackchange";
import MusicFileTitle from "../../reusable/music-file-title";
import MusicFileTotalDuration from "../../reusable/music-file-total-duration";
import { useNavigation } from "@react-navigation/native";
import { RootTabNavigationProp } from "../../../types/navigation-type";
import useZustandStore from "../../../store/useZustandStore";

const MiniMusicPlayer = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const { navigate } = useNavigation<RootTabNavigationProp>();

  // console.log("INSIDE MINI_MUSIC_MUSIC_PLAYER", currentMusicTrack?.title);

  return currentMusicTrack ? (
    <View className="absolute bottom-1 flex h-14 w-full flex-col rounded-lg">
      <View
        className="mx-4 flex-1 flex-col justify-center overflow-hidden rounded-lg py-1 pb-0"
        style={{
          backgroundColor: COLORS.secondaryBg,
        }}
      >
        <View className="flex-1 flex-row items-center justify-between gap-2 px-1">
          <Pressable
            className="flex-1 flex-row items-center space-x-2"
            onPress={() => navigate("player")}
          >
            <MusicFileAlbumDisplayOnTrackChange
              size="small"
              imgPriority={"high"}
            />
            <View className="flex-1">
              <MusicFileTitle text="small" affectSwipable={false} />
              <View className="flex-row items-center">
                <DisplayCurrentMusicPosition />
                <Text
                  className="font-primary_regular text-xs text-secondaryText"
                  style={{
                    color: COLORS.secondaryText,
                  }}
                >
                  :
                </Text>
                <MusicFileTotalDuration />
              </View>
            </View>
          </Pressable>
          <View className="flex-row items-center">
            <PlayPauseMusicIcon size={26} small={true} />
            <View className="ml-3">
              <PlayPreviusNextMusicIcon type="next" size={32} color="primary" />
            </View>
          </View>
        </View>
        <MusicFileRemainingDurationVisual />
      </View>
    </View>
  ) : null;
};

export default MiniMusicPlayer;

const MusicFileRemainingDurationVisual = () => {
  const progress = useProgress();
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  return currentMusicTrack ? (
    <View
      className="mt-1 h-1 rounded-lg"
      style={{
        backgroundColor: COLORS.main + "aa",
        width: `${Math.floor(
          (progress.position / (currentMusicTrack?.duration / 1000)) * 100,
        )}%`,
      }}
    />
  ) : null;
};
