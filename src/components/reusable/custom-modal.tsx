import COLORS from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

function CustomModal({
  isVisible,
  setIsVisible,
  modalText,
  setModalText,
  onPress,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  modalText: string;
  setModalText: Dispatch<SetStateAction<string>>;
  onPress: () => void;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      focusable={true}
    >
      <View
        className="flex-1"
        style={{ backgroundColor: COLORS.primaryBg + "bb" }}
      >
        <View
          className="absolute left-[5%] top-1/4 w-[90%] rounded-md px-3 py-4"
          style={{ backgroundColor: COLORS.primaryIcon }}
        >
          <View className="flex-row items-center justify-between pb-2">
            <Text className="font-primary_semibold text-xl text-primaryText">
              New Playlist
            </Text>
            <Pressable onPress={() => setIsVisible(false)}>
              <MaterialIcons
                name="close"
                color={COLORS.secondaryIcon}
                size={22}
              />
            </Pressable>
          </View>
          <View className="w-full flex-1 justify-around space-y-2">
            <Text
              className="font-primary_regular text-base"
              style={{ color: COLORS.secondaryText }}
            >
              Please enter a playlist name
            </Text>
            <TextInput
              className="rounded-sm border border-secondaryText px-2 py-1"
              style={{ color: COLORS.primaryText }}
              value={modalText}
              onChangeText={setModalText}
              autoFocus
            />
            <View>
              <Pressable
                className="flex-row items-center justify-center self-end rounded-sm bg-secondaryBg px-2 py-1"
                onPress={onPress}
              >
                <Text
                  style={{
                    backgroundColor: COLORS.secondaryBg,
                    color: COLORS.primaryBg,
                  }}
                  className="font-primary_semibold text-base"
                >
                  Create
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;
