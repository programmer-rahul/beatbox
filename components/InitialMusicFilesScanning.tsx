import { COLORS } from "@/constants/COLORS";
import { ActivityIndicator } from "react-native";
import CustomView from "./reusable/CustomView";
import CustomText from "./reusable/CustomText";

const InitialMusicFilesScanning = () => {
  return (
    <CustomView
      className="flex-1 items-center justify-center gap-4 px-4"
      backgroundColor="NAVIGATION_BG"
    >
      <CustomText className="text-3xl" color="PRIMARY_TEXT">
        Scanning Music Files
      </CustomText>
      <ActivityIndicator size={"large"} color={COLORS.MAIN} />
    </CustomView>
  );
};

export default InitialMusicFilesScanning;
