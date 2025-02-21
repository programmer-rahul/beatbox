import { useCallback, useMemo } from "react";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants/COLORS";
import { useActiveTrack } from "react-native-track-player";
import useMusicStore from "@/store/useMusicStore";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const PlayerFavouriteMusicIcon = ({ size = 25 }: { size?: number }) => {
  const activeTrack = useActiveTrack();
  const favouriteLocalMusicFiles = useMusicStore(
    (state) => state.favouriteLocalMusicFiles,
  );
  const addMusicFileInFavouriteList = useMusicStore(
    (state) => state.addMusicFileInFavouriteList,
  );
  const removeMusicFileInFavouriteList = useMusicStore(
    (state) => state.removeMusicFileInFavouriteList,
  );

  // Memoize the checkIsFavouriteMusic function
  const checkIsFavouriteMusic = useCallback(() => {
    if (!activeTrack) return false;
    return favouriteLocalMusicFiles.some(
      (musicFileId) => musicFileId === activeTrack.contentType,
    );
  }, [activeTrack, favouriteLocalMusicFiles]);

  // Memoize the isFavouriteMusic state
  const isFavouriteMusic = useMemo(
    () => checkIsFavouriteMusic(),
    [checkIsFavouriteMusic],
  );

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onFavouriteIconPress = () => {
    if (!activeTrack) return;

    const musicFileId = activeTrack?.contentType || "";

    if (isFavouriteMusic) {
      removeMusicFileInFavouriteList(musicFileId);
    } else {
      addMusicFileInFavouriteList(musicFileId);
    }

    scale.value = withSpring(1.2, { stiffness: 400 }, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <Pressable onPress={onFavouriteIconPress}>
      <Animated.View style={animatedStyle}>
        <AntDesign
          name={isFavouriteMusic ? "heart" : "hearto"}
          size={size}
          color={isFavouriteMusic ? COLORS.MAIN : COLORS.SECONDARY_ICON}
        />
      </Animated.View>
    </Pressable>
  );
};

export default PlayerFavouriteMusicIcon;
