import { Image, Text, View } from "react-native";
import PlayerScreenHeader from "./../components/player/player-screen-header";
import PlayerScreenView from "./../components/player/player-screen-view";
import COLORS from "../constants/colors";
import { Link, useIsFocused } from "@react-navigation/native";
import { Music } from "lucide-react-native";
import useZustandStore from "../store/useZustandStore";
import { useState } from "react";
import { fetchCoverImage } from "../lib/music";
import { BlurView as BlurView2 } from "@react-native-community/blur";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayerScreen = () => {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  const isSwiping = useZustandStore((state) => state.isSwiping);
  const isFocused = useIsFocused();

  console.log("inside player screen");

  const [musicCover, setMusicCover] = useState("");
  if (currentMusicTrack) {
    fetchCoverImage(currentMusicTrack?.title).then(
      (coverImage) => coverImage && setMusicCover(coverImage),
    );
  }

  return (
    <View className="flex-1">
      <SafeAreaView className="z-10 flex-1 transition-colors">
        {currentMusicTrack ? (
          <View className="flex-1 pb-20">
            <PlayerScreenHeader />
            <PlayerScreenView />
          </View>
        ) : (
          <NoMusicFileSelected />
        )}
      </SafeAreaView>
      {currentMusicTrack && currentMusicTrack.cover && (
        <View className="absolute left-0 top-0 -z-10 h-full w-full transition-colors">
          {isSwiping || !isFocused ? (
            <View
              className="h-full w-full bg-primaryBg transition-colors"
              style={{ backgroundColor: COLORS.primaryBg }}
            />
          ) : (
            <>
              <Image
                key={"blurryImage"}
                source={{ uri: musicCover }}
                className="h-full w-full"
                resizeMode="repeat"
              />
              <BlurView2
                blurRadius={25}
                blurAmount={100}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default PlayerScreen;

const NoMusicFileSelected = () => {
  const isSwiping = useZustandStore((state) => state.isSwiping);

  console.log("INSIDE NO MUSIC_FILE_SELECTED");

  return (
    <View className="relative flex flex-1 items-center justify-center">
      <View className="flex items-center justify-center gap-4">
        <Text
          className="text-center font-primary_regular text-3xl text-primaryBg"
          style={{
            color: isSwiping ? COLORS.primaryText : COLORS.primaryBg,
          }}
        >
          No Music File Selected Right Now
        </Text>
        <View
          className="rounded-md px-4 py-1 font-primary_semibold"
          style={{ backgroundColor: COLORS.main + "aa" }}
        >
          <Link to={"/home"}>
            <Text
              className="font-primary_semibold text-xl"
              style={{
                color: isSwiping ? COLORS.primaryText : COLORS.primaryBg,
              }}
            >
              Play Now
            </Text>
          </Link>
        </View>
      </View>
      <View className="absolute -z-10 opacity-10">
        <Music size={320} color={COLORS.main} />
      </View>
    </View>
  );
};
