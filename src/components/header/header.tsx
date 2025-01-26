import { View, Text } from "react-native";
import COLORS from "./../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScanMusicFilesIcon from "../reusable/scan-music-files-icon";
import { useState } from "react";
import { Settings } from "lucide-react-native";

const Header = () => {
  const insets = useSafeAreaInsets();
  const [refreshMusicFilesModal, setRefreshMusicFilesModal] = useState(false);

  return (
    <View
      className="flex flex-row items-center justify-between px-3 pb-1"
      style={{
        paddingTop: insets.top + 6,
      }}
    >
      <View>
        <Text
          className="font-primary_semibold text-3xl"
          style={{ color: COLORS.primaryText }}
        >
          BeatBox
        </Text>
      </View>
      <View className="flex-row items-center" style={{ gap: 16 }}>
        <ScanMusicFilesIcon
          refreshMusicFilesModal={refreshMusicFilesModal}
          setRefreshMusicFilesModal={setRefreshMusicFilesModal}
        />
      </View>
    </View>
  );
};

export default Header;
