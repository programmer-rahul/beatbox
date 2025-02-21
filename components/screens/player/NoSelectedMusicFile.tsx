import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";
import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function NoSelectedMusicFile() {
  return (
    <CustomView
      className="relative flex flex-1 items-center justify-center px-4"
      backgroundColor="NAVIGATION_BG"
    >
      <CustomView className="flex items-center justify-center gap-4">
        <CustomText className="text-center text-3xl" fontWeight="Semibold">
          No Music File Selected Right Now
        </CustomText>
        <CustomView className="rounded-md px-4 py-1" backgroundColor="MAIN">
          <Link href={"/"}>
            <CustomText
              className="text-xl"
              style={{
                color: COLORS.PRIMARY_TEXT,
              }}
            >
              Play Now
            </CustomText>
          </Link>
        </CustomView>
      </CustomView>
      <CustomView className="absolute -z-10 opacity-10">
        <Ionicons name="musical-notes" size={320} color={COLORS.MAIN} />
      </CustomView>
    </CustomView>
  );
}
