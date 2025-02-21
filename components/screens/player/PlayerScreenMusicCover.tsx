import CustomView from "@/components/reusable/CustomView";
import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

export default function PlayerScreenMusicCover({ uri }: { uri?: string }) {
  return (
    <CustomView
      className={
        "aspect-square w-4/5 items-center justify-center self-center rounded-xl"
      }
      backgroundColor="MAIN"
      backgroundColorOpacity="66"
    >
      {uri && uri !== "UNKNOWN" ? (
        <FastImage
          source={{ uri: uri, cache: "immutable" }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          resizeMode="cover"
        />
      ) : (
        <Ionicons name="musical-notes" size={160} color={COLORS.MAIN} />
      )}
    </CustomView>
  );
}
