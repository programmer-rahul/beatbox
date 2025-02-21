import AddMusicInPlaylistIcon from "@/components/icons/AddMusicInPlaylistIcon";
import PlayerFavouriteMusicIcon from "@/components/icons/PlayerFavouriteMusicIcon";
import RepeatModeIcon from "@/components/icons/RepeatModeIcon";
import SleepTimerIcon from "@/components/icons/SleepTimerIcon";
import CustomView from "@/components/reusable/CustomView";
import PlayerScreenMusicSlider from "./PlayerScreenMusicSlider";
import PlayPreviousNextMusicIcon from "@/components/icons/PlayPreviousNextMusicIcon";
import PlayBackwardMusicIcon from "@/components/icons/PlayBackwardMusicIcon";
import PlayPauseMusicIcon from "@/components/icons/PlayPauseMusicIcon";
import PlayForwardMusicIcon from "@/components/icons/PlayForwardMusicIcon";

export default function PlayerScreenControlBtns() {
  return (
    <CustomView className="gap-4">
      {/* Upper Control Btns */}
      <CustomView className="flex-row items-center justify-between px-4">
        <CustomView className="flex-row items-center gap-4">
          <RepeatModeIcon size={32} />
          <AddMusicInPlaylistIcon size={35} />
          <SleepTimerIcon size={26} />
        </CustomView>
        <CustomView>
          <PlayerFavouriteMusicIcon size={28} />
        </CustomView>
      </CustomView>

      {/* Slider  */}
      <CustomView>
        <PlayerScreenMusicSlider />
      </CustomView>

      {/* Bottom Control Btns  */}
      <CustomView className="flex-row items-center justify-between px-4">
        <PlayPreviousNextMusicIcon type="previous" size={45} />
        <PlayBackwardMusicIcon size={45} />
        <PlayPauseMusicIcon size={65} />
        <PlayForwardMusicIcon size={45} />
        <PlayPreviousNextMusicIcon type="next" size={45} />
      </CustomView>
    </CustomView>
  );
}
