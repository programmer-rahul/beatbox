import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useZustandStore from "../../../store/useZustandStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import COLORS from "../../../constants/colors";
import _BackgroundTimer from "react-native-background-timer";
import TrackPlayer from "react-native-track-player";

function SleepTimerBottomSheet() {
  const bottomSheet = useZustandStore((state) => state.bottomSheet);
  const setBottomSheet = useZustandStore((state) => state.setBottomSheet);
  const sleepTimer = useZustandStore((state) => state.sleepTimer);
  const setSleepTimer = useZustandStore((state) => state.setSleepTimer);
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const onSleepTimerValueClick = (minutes: number) => {
    // clear timeout if there is already running
    if (sleepTimer.status) {
      _BackgroundTimer.clearTimeout(sleepTimer.timeoutId);
    }

    const timeoutId = _BackgroundTimer.setTimeout(
      () => {
        setSleepTimer({ status: false, minutes: 0, timeoutId: 0 });

        // stop music
        TrackPlayer.pause();
        setIsTrackPlaying(false);
      },
      minutes * (1000 * 60),
    );

    setSleepTimer({ status: true, minutes: minutes, timeoutId: timeoutId });
    bottomSheetRef.current?.close();
  };

  const onTurnOfTimerClick = () => {
    if (sleepTimer.timeoutId) {
      _BackgroundTimer.clearTimeout(sleepTimer.timeoutId);
    }

    setSleepTimer({ status: false, minutes: 0, timeoutId: 0 });
    bottomSheetRef.current?.close();
  };

  return bottomSheet.isVisible ? (
    <GestureHandlerRootView
      style={{
        ...styles.container,
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={0}
        snapPoints={["60%", "100%"]}
        onClose={() => {
          setBottomSheet({ isVisible: false, sheet: null });
        }}
        containerStyle={{ backgroundColor: COLORS.primaryBg + "88" }}
        backgroundStyle={{ backgroundColor: COLORS.bottomSheet }}
        handleStyle={{
          backgroundColor: COLORS.bottomSheet,
          borderRadius: 50,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.secondaryText,
        }}
      >
        <BottomSheetView
          style={{
            ...styles.contentContainer,
          }}
        >
          <View className="mb-2 w-full border-b border-secondaryText px-5 pb-2">
            <Text className="text-center font-primary_semibold text-base text-primaryText">
              {bottomSheet.sheet === "sleep-timer" && "Sleep Timer"}
            </Text>
          </View>

          <View className="h-full w-full space-y-4 px-5">
            {sleepTimer.status && (
              <Pressable onPress={() => onTurnOfTimerClick()}>
                <Text className="font-primary_regular text-base text-primaryText">
                  Turn of timer
                </Text>
              </Pressable>
            )}

            {[1, 5, 10, 15, 20, 30, 45, 60].map((num) => {
              return (
                <Pressable
                  onPress={() => onSleepTimerValueClick(num)}
                  key={num}
                >
                  <Text className="font-primary_regular text-base text-primaryText">
                    {num} Minutes
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  ) : null;
}

export default SleepTimerBottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "96%",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
