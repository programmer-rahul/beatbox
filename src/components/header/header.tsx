import { View, Text } from "react-native";
import COLORS from "./../../constants/colors";
import { RefreshCcw } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RefreshMusicFilesModal from "../reusable/modal/refresh-music-files-modal";
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
      <View>
        <RefreshCcw
          size={20}
          color={COLORS.primaryText}
          onPress={() => setRefreshMusicFilesModal(true)}
        />
        <RefreshMusicFilesModal
          isVisible={refreshMusicFilesModal}
          setIsVisible={setRefreshMusicFilesModal}
        />
      </View>
    </View>
  );
};

export default Header;
