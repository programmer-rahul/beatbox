import { View, Text } from "react-native";
import COLORS from "./../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScanMusicFilesIcon from "../reusable/scan-music-files-icon";
import { useState } from "react";

const Header = () => {
  const insets = useSafeAreaInsets();
  const [refreshMusicFilesModal, setRefreshMusicFilesModal] = useState(false);

  return (
    <View
      className="flex flex-row items-center justify-between px-3 pb-4"
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
      <ScanMusicFilesIcon
        refreshMusicFilesModal={refreshMusicFilesModal}
        setRefreshMusicFilesModal={setRefreshMusicFilesModal}
      />
    </View>
  );
};

export default Header;
