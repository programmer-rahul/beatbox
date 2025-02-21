import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

function MusicFileCover({ uri }: { uri?: string }) {
  return (
    <View
      className="aspect-square h-11 items-center justify-center rounded-full"
      style={{ backgroundColor: COLORS.MAIN + "33" }}
    >
      {uri && uri !== "UNKNOWN" ? (
        <FastImage
          source={{ uri: uri, cache: "immutable" }}
          style={{ width: "100%", height: "100%", borderRadius: 50 }}
          resizeMode="cover"
        />
      ) : (
        <Ionicons name="musical-notes" size={24} color={COLORS.MAIN} />
      )}
    </View>
  );
}

export default MusicFileCover;
