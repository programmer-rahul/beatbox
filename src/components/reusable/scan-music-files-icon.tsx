import { RefreshCcw } from "lucide-react-native";
import { View } from "react-native";
import COLORS from "../../constants/colors";
import RefreshMusicFilesModal from "./modal/refresh-music-files-modal";
import { Dispatch, SetStateAction, useState } from "react";

interface TScanMusicFilesIconProps {
  refreshMusicFilesModal: boolean;
  setRefreshMusicFilesModal: Dispatch<SetStateAction<boolean>>;
}

const ScanMusicFilesIcon = ({
  refreshMusicFilesModal,
  setRefreshMusicFilesModal,
}: TScanMusicFilesIconProps) => {
  return (
    <View>
      <RefreshCcw
        size={20}
        color={COLORS.secondaryIcon}
        onPress={() => setRefreshMusicFilesModal(true)}
      />
      <RefreshMusicFilesModal
        isVisible={refreshMusicFilesModal}
        setIsVisible={setRefreshMusicFilesModal}
      />
    </View>
  );
};

export default ScanMusicFilesIcon;
