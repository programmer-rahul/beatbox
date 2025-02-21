import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { useEffect, useRef } from "react";
import useMusicStore from "@/store/useMusicStore";
import SleepTimerBottomSheet from "../bottom-sheet/SleepTimerBottomSheet";
import { COLORS } from "@/constants/COLORS";
import _BackgroundTimer from "react-native-background-timer";
import AddMusicInPlaylistBottomSheet from "../bottom-sheet/AddMusicInPlaylistBottomSheet";

export default function CustomBottomSheet() {
  const customBottomSheet = useMusicStore((state) => state.customBottomSheet);
  const closeBottomSheet = useMusicStore((state) => state.closeBottomSheet);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const onBottomSheetClose = () => {
    setTimeout(() => {
      closeBottomSheet();
    }, 500);
  };

  useEffect(() => {
    if (!sheetRef.current) return;
    if (customBottomSheet) {
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [customBottomSheet]);

  if (customBottomSheet === null) return;

  return (
    <BottomSheet
      ref={sheetRef}
      modal={true}
      onClose={onBottomSheetClose}
      style={{ backgroundColor: COLORS.BOTTOM_SHEET }}
      dragHandleStyle={{ backgroundColor: COLORS.PRIMARY_ICON }}
      openDuration={400}
      closeDuration={400}
      height={"60%"}
      disableKeyboardHandling={true}
    >
      {customBottomSheet === "SLEEP_TIMER" && <SleepTimerBottomSheet />}
      {customBottomSheet === "ADD_MUSIC_IN_PLAYLIST" && (
        <AddMusicInPlaylistBottomSheet />
      )}
    </BottomSheet>
  );
}
