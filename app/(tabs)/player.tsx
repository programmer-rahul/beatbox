import CustomView from "@/components/reusable/CustomView";
import NoSelectedMusicFile from "@/components/screens/player/NoSelectedMusicFile";
import PlayerScreenHeader from "@/components/screens/player/PlayerScreenHeader";
import { useActiveTrack } from "react-native-track-player";
import { TAB_BAR_HEIGHT } from "@/constants/DIMENSIONS";
import PlayerScreenMusicTitle from "@/components/screens/player/PlayerScreenMusicTitle";
import PlayerScreenControlBtns from "@/components/screens/player/PlayerScreenControTitle";
import PlayerScreenMusicCover from "@/components/screens/player/PlayerScreenMusicCover";

export default function PlayerPage() {
  const currentTrack = useActiveTrack();

  if (!currentTrack) {
    return <NoSelectedMusicFile />;
  }

  return (
    <CustomView
      backgroundColor="NAVIGATION_BG"
      className="flex-1"
      style={{ paddingBottom: TAB_BAR_HEIGHT }}
    >
      {/* header  */}
      <PlayerScreenHeader />

      {/* music file cover image  */}
      <CustomView
        className="flex flex-1 items-center justify-center"
        backgroundColor="PRIMARY_BG"
      >
        <PlayerScreenMusicCover uri={currentTrack?.artwork} />
      </CustomView>

      {/* music file controls  */}
      <CustomView className="h-2/5 flex-row" backgroundColor="PRIMARY_BG">
        <CustomView
          backgroundColor="NAVIGATION_BG"
          className="flex-1 justify-evenly rounded-t-3xl border-0 border-b-0 px-2 py-2"
        >
          <PlayerScreenMusicTitle
            title={currentTrack?.title || ""}
            album={currentTrack?.album || ""}
          />
          <PlayerScreenControlBtns />
        </CustomView>
      </CustomView>
    </CustomView>
  );
}
