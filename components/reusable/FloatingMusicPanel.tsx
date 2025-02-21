import { COLORS } from "@/constants/COLORS";
import { Pressable } from "react-native";
import { useActiveTrack, useProgress } from "react-native-track-player";
import CustomView from "./CustomView";
import CustomText from "./CustomText";
import { router } from "expo-router";
import MusicFileCover from "./MusicFileCover";
import { formatMusicFileDuration } from "@/libs/time";
import PlayPauseMusicIcon from "../icons/PlayPauseMusicIcon";
import PlayPreviousNextMusicIcon from "../icons/PlayPreviousNextMusicIcon";

const FloatingMusicPanel = () => {
  const activeTrack = useActiveTrack();

  if (!activeTrack) {
    return null;
  }
  return (
    <CustomView className="absolute bottom-20 flex w-full flex-col rounded-lg">
      <CustomView
        className="mx-4 flex-1 flex-col justify-center overflow-hidden rounded-lg py-1 pb-0"
        backgroundColor="MODAL_BG"
      >
        <CustomView className="flex-1 flex-row items-center justify-between gap-4 px-3">
          <Pressable
            className="flex-1 flex-row items-center gap-2"
            onPress={() => router.push("/player")}
          >
            <MusicFileCover uri={activeTrack.artwork} />

            <CustomView className="flex-1">
              <CustomText
                className="flex-1 text-xs leading-relaxed"
                numberOfLines={1}
                color={"PRIMARY_BG"}
                fontWeight="Semibold"
              >
                {activeTrack.title}
              </CustomText>

              <CustomView className="flex-1 flex-row items-center">
                <DisplayCurrentMusicPosition />
                <CustomText className="text-xs" color="NAVIGATION_BG">
                  :
                </CustomText>
                <MusicFileTotalDuration duration={activeTrack.duration || 0} />
              </CustomView>
            </CustomView>
          </Pressable>
          <CustomView className="flex-row items-center gap-2">
            <PlayPauseMusicIcon size={27} fill="NAVIGATION_BG" />
            <PlayPreviousNextMusicIcon
              type="next"
              size={40}
              fill="NAVIGATION_BG"
            />
          </CustomView>
        </CustomView>
        <MusicFileRemainingDurationVisual
          duration={activeTrack?.duration || 0}
        />
      </CustomView>
    </CustomView>
  );
};

export default FloatingMusicPanel;

const MusicFileRemainingDurationVisual = ({
  duration,
}: {
  duration: number;
}) => {
  const progress = useProgress();
  //   const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);

  return (
    <CustomView
      className="mt-1 h-1 rounded-lg"
      style={{
        backgroundColor: COLORS.MAIN + "aa",
        width: `${Math.floor((progress.position / (duration / 1000)) * 100)}%`,
      }}
    />
  );
};

function DisplayCurrentMusicPosition() {
  const progress = useProgress();
  return (
    <CustomText className="text-xs" color="NAVIGATION_BG">
      {formatMusicFileDuration(progress.position, "seconds")}
    </CustomText>
  );
}

function MusicFileTotalDuration({ duration }: { duration: number }) {
  return (
    <CustomText className="text-xs" color="NAVIGATION_BG">
      {formatMusicFileDuration(duration, "milliseconds")}
    </CustomText>
  );
}
