import { View, Text } from "react-native";
import COLORS from "./../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScanMusicFilesIcon from "../reusable/scan-music-files-icon";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";

const Header = () => {
  const insets = useSafeAreaInsets();
  const [refreshMusicFilesModal, setRefreshMusicFilesModal] = useState(false);

  return (
    <View
      className="rounded-b-3x px-6"
      style={{
        paddingTop: insets.top + 20,
        paddingBottom: 20,
        backgroundColor: COLORS.navigationBg,
      }}
    >
      <View className="flex flex-row items-center justify-between">
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
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
      ></LinearGradient>
    </View>
  );
};

export default Header;
