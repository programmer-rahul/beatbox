import { useEffect, useRef, useState, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useZustandStore from "../../../store/useZustandStore";
import COLORS from "../../../constants/colors";
import _BackgroundTimer from "react-native-background-timer";
import TrackPlayer from "react-native-track-player";
import {
  calculateRemainingTime,
  formatMusicFileDuration,
} from "../../../lib/helper";
import RBSheet from "react-native-raw-bottom-sheet";

const onSleepTimerStart = (minutes: number) => {
  const sleepTimer = useZustandStore.getState().sleepTimer;

  if (sleepTimer.status) {
    _BackgroundTimer.clearTimeout(sleepTimer.timeoutId);
  }

  const timeoutId = _BackgroundTimer.setTimeout(() => {
    useZustandStore.getState().setSleepTimer({
      status: false,
      minutes: 0,
      timeoutId: 0,
      startedTime: null,
    });

    TrackPlayer.pause();
    useZustandStore.getState().setIsTrackPlaying(false);
  }, minutes * 60000);

  useZustandStore.getState().setSleepTimer({
    status: true,
    minutes,
    timeoutId,
    startedTime: new Date(),
  });
};

function SleepTimerBottomSheet() {
  const bottomSheet = useZustandStore((state) => state.bottomSheet);
  const setBottomSheet = useZustandStore((state) => state.setBottomSheet);
  const refRBSheet = useRef(null);

  useEffect(() => {
    if (bottomSheet.sheet == "sleep-timer" && bottomSheet.isVisible) {
      (refRBSheet.current as any)?.open();
    }
  }, [bottomSheet]);

  return bottomSheet.isVisible ? (
    <RBSheet
      ref={refRBSheet}
      draggable={true}
      dragOnContent
      closeOnPressMask
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        draggableIcon: {
          backgroundColor: COLORS.primaryText,
        },
        container: {
          backgroundColor: COLORS.bottomSheet,
          borderRadius: 20,
          height: "50%",
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      onClose={() => {
        setBottomSheet({ isVisible: false, sheet: "sleep-timer" });
      }}
    >
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {bottomSheet.sheet === "sleep-timer" && "Sleep Timer"}
          </Text>
        </View>
        <View style={styles.optionContainer}>
          <TurnOfTimer bottomSheetRef={refRBSheet} />
          {[1, 5, 10, 15, 20, 30, 45, 60].map((num) => (
            <Pressable
              onPress={() => {
                onSleepTimerStart(num);
                (refRBSheet.current as any)?.close();
              }}
              key={num}
            >
              <Text style={styles.optionText}>{num} Minutes</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </RBSheet>
  ) : null;
}

export default SleepTimerBottomSheet;

const styles = StyleSheet.create({
  header: {
    marginBottom: 8,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryText,
    paddingBottom: 8,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.primaryText,
  },
  optionContainer: { width: "100%", paddingHorizontal: 20, gap: 16 },
  optionText: { fontSize: 16, color: COLORS.primaryText },
});

const TurnOfTimer = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.MutableRefObject<null>;
}) => {
  const sleepTimer = useZustandStore((state) => state.sleepTimer);
  const setSleepTimer = useZustandStore((state) => state.setSleepTimer);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const onTurnOfTimerClick = useCallback(() => {
    if (sleepTimer.timeoutId) {
      _BackgroundTimer.clearTimeout(sleepTimer.timeoutId);
    }

    setSleepTimer({
      status: false,
      minutes: 0,
      timeoutId: 0,
      startedTime: null,
    });
    (bottomSheetRef.current as any)?.close();
  }, [sleepTimer, setSleepTimer]);

  useEffect(() => {
    if (!sleepTimer.status || !sleepTimer.startedTime) return;

    const intervalId = _BackgroundTimer.setInterval(() => {
      const remaining = calculateRemainingTime(
        sleepTimer.startedTime!,
        sleepTimer.minutes * 60,
      );
      setRemainingTime(remaining);
    }, 1000);

    return () => {
      _BackgroundTimer.clearInterval(intervalId);
      !sleepTimer.status && setRemainingTime(null);
    };
  }, [sleepTimer]);

  return sleepTimer.status ? (
    <Pressable
      onPress={onTurnOfTimerClick}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 16, color: COLORS.primaryText }}>
        Turn off timer
      </Text>
      {remainingTime !== null && (
        <Text style={{ fontSize: 16, color: COLORS.primaryText + "aa" }}>
          ( {formatMusicFileDuration(remainingTime, "seconds")} )
        </Text>
      )}
    </Pressable>
  ) : null;
};
