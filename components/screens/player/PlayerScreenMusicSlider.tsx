import CustomRangeSlider from "@/components/reusable/CustomRangeSlider";
import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";
import { formatMusicFileDuration } from "@/libs/time";
import { useActiveTrack, useProgress } from "react-native-track-player";

const PlayerScreenMusicSlider = () => {
  const activeTrack = useActiveTrack();
  const progress = useProgress();

  return activeTrack ? (
    <CustomView>
      <CustomRangeSlider totalMusicDuration={activeTrack?.duration || 0} />
      <CustomView className="flex-row justify-between px-4">
        <CustomText
          className="text-xs"
          color="SECONDARY_TEXT"
          fontWeight="Medium"
        >
          {formatMusicFileDuration(progress.position, "seconds")}
        </CustomText>
        <CustomText
          className="text-right text-xs"
          color="SECONDARY_TEXT"
          fontWeight="Medium"
        >
          {formatMusicFileDuration(
            activeTrack?.duration || 4545,
            "milliseconds",
          )}
        </CustomText>
      </CustomView>
    </CustomView>
  ) : null;
};

export default PlayerScreenMusicSlider;
