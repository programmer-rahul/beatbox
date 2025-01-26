import COLORS from "../../../constants/colors";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import useZustandStore from "../../../store/useZustandStore";
import { Flashlight, RefreshCcw } from "lucide-react-native";
import { scanLocalMusicFiles } from "../../../hooks/useFetchLocalMusic";

interface TRefreshMusicFilesModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

function RefreshMusicFilesModal({
  isVisible,
  setIsVisible,
}: TRefreshMusicFilesModal) {
  const allLocalMusicTracks = useZustandStore(
    (state) => state.allLocalMusicTracks,
  );
  const setAllLocalMusicTracks = useZustandStore(
    (state) => state.setAllLocalMusicTracks,
  );

  const [isScanning, setIsScanning] = useState(false);

  const onStartScanningClick = () => {
    setIsScanning(true);
    setTimeout(async () => {
      const fetchedMusicFiles = await scanLocalMusicFiles();
      setIsScanning(false);
      setAllLocalMusicTracks(fetchedMusicFiles);
    }, 0);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      focusable={true}
    >
      <View
        className="flex-1"
        style={{ backgroundColor: COLORS.primaryBg + "cc" }}
      >
        <View
          className="absolute left-[5%] top-1/4 w-[90%] rounded-md px-3 py-4"
          style={{ backgroundColor: COLORS.modalBg }}
        >
          <View className="flex-row items-center justify-between pb-2">
            <Text className="font-primary_semibold text-xl text-primaryBg">
              Scan
            </Text>
          </View>
          <View className="w-full flex-1 justify-around space-y-2">
            {!isScanning ? (
              <Pressable
                onPress={() => onStartScanningClick()}
                className="flex flex-row items-center justify-center space-x-2 rounded-md border px-4 py-2"
                style={{
                  borderColor: COLORS.main + "aa",
                  backgroundColor: COLORS.main,
                }}
              >
                <RefreshCcw size={20} color={COLORS.primaryText} />
                <Text
                  style={{ color: COLORS.primaryText }}
                  className="font-primary_semibold text-base"
                >
                  Scan Now
                </Text>
              </Pressable>
            ) : (
              <View className="space-y-2">
                <ActivityIndicator color={COLORS.main} size={"large"} />
                <Text
                  style={{ color: COLORS.secondaryText }}
                  className="text-center font-primary_regular text-base"
                >
                  Scanning
                </Text>
                <Pressable
                  onPress={() => setIsScanning(false)}
                  className="flex flex-row items-center justify-center space-x-2 self-center rounded-md border px-4 py-1"
                  style={{
                    borderColor: COLORS.main + "aa",
                    backgroundColor: COLORS.main,
                  }}
                >
                  <Text
                    style={{ color: COLORS.primaryText }}
                    className="font-primary_semibold text-base"
                  >
                    Cancel
                  </Text>
                </Pressable>
              </View>
            )}

            {!isScanning && (
              <Text
                style={{ color: COLORS.secondaryText }}
                className="font-primary_semibold text-base"
              >
                Music Files Count : {allLocalMusicTracks.length}
              </Text>
            )}

            <View className="flex-row justify-end gap-4">
              <Pressable
                onPress={() => {
                  !isScanning && setIsVisible(false);
                }}
              >
                <Text
                  style={{
                    color: isScanning ? COLORS.main + "99" : COLORS.main + "dd",
                  }}
                  className="font-primary_semibold text-base"
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default RefreshMusicFilesModal;
