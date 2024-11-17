import { useState } from "react";
import ScanMusicFilesIcon from "../reusable/scan-music-files-icon";
import COLORS from "./../../constants/colors";
import { Pressable, Text, View } from "react-native";

const NoMusicFilesFound = () => {
  const [refreshMusicFilesModal, setRefreshMusicFilesModal] = useState(false);

  return (
    <View className="h-full items-center justify-center gap-3">
      <Text
        className="text-center font-primary_semibold text-2xl text-primaryText"
        style={{ color: COLORS.primaryText }}
      >
        No Music Files Found
      </Text>
      <Pressable
        className="flex-row items-center rounded-md bg-main px-3 py-1"
        onPress={() => setRefreshMusicFilesModal(true)}
      >
        <Text
          className="mr-2 font-primary_semibold text-xl text-primaryText"
          style={{ color: COLORS.primaryText }}
        >
          Scan
        </Text>
        <ScanMusicFilesIcon
          refreshMusicFilesModal={refreshMusicFilesModal}
          setRefreshMusicFilesModal={setRefreshMusicFilesModal}
        />
      </Pressable>
    </View>
  );
};

export default NoMusicFilesFound;
