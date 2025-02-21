import { Pressable, ScrollView } from "react-native";
import CustomText from "../reusable/CustomText";
import useMusicStore from "@/store/useMusicStore";
import CountdownTimer from "./CountDownTimer";
import BottomSheetLayout from "@/layout/BottomSheetLayout";

export default function SleepTimerBottomSheet() {
  const setSleepTimer = useMusicStore((state) => state.setSleepTimer);
  const clearSleepTimer = useMusicStore((state) => state.clearSleepTimer);
  const sleepTimerMinutes = useMusicStore((state) => state.sleepTimerMinutes);

  const onSleepTimerStart = (minutes: number) => {
    setSleepTimer(minutes);
  };

  const onTimerOffPress = () => {
    clearSleepTimer();
  };

  return (
    <BottomSheetLayout heading="Sleep Timer">
      <>
        <CountdownTimer />
        <ScrollView showsVerticalScrollIndicator={false}>
          {sleepTimerMinutes && (
            <RenderTimerItem
              text={"Turn Off Timer"}
              showMinutesText={false}
              onPress={() => onTimerOffPress()}
            />
          )}
          {[1, 3, 5, 10, 15, 20, 30, 45, 60].map((num, index) => (
            <RenderTimerItem
              text={String(num)}
              onPress={(text) => onSleepTimerStart(Number(text))}
              key={index}
            />
          ))}
        </ScrollView>
      </>
    </BottomSheetLayout>
  );
}

function RenderTimerItem({
  text,
  onPress,
  showMinutesText = true,
}: {
  text: string;
  onPress: (text: string) => void;
  showMinutesText?: boolean;
}) {
  return (
    <Pressable onPress={() => onPress(text)} style={{ marginBottom: 10 }}>
      <CustomText className="text-base" fontWeight="Medium">
        {text} {showMinutesText && "Minutes"}
      </CustomText>
    </Pressable>
  );
}
