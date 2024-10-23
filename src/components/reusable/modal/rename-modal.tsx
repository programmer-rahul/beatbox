import { View, Text, Pressable, Modal, TextInput } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import COLORS from "../../../constants/colors";

interface TRenameModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  defaultName?: string;
  onRenameClick: (newName: string) => void;
}

const RenameModal = ({
  isVisible,
  setIsVisible,
  defaultName = "",
  onRenameClick,
}: TRenameModalProps) => {
  const [modalText, setModalText] = useState(defaultName);

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
          <View className="flex-row items-center justify-between">
            <Text className="font-primary_semibold text-xl text-primaryBg">
              Rename
            </Text>
          </View>
          <View className="w-full flex-1 justify-around space-y-2">
            <Text
              className="font-primary_regular text-base"
              style={{ color: COLORS.secondaryText }}
            >
              Please enter a new playlist name
            </Text>
            <TextInput
              className="rounded-sm border-b border-b-main py-1"
              style={{ color: COLORS.primaryBg }}
              value={modalText}
              onChangeText={setModalText}
              autoFocus={true}
              cursorColor={COLORS.main}
            />

            <View className="flex-row justify-end gap-4">
              <Pressable onPress={() => setIsVisible(false)}>
                <Text
                  style={{
                    color: COLORS.main + "dd",
                  }}
                  className="font-primary_semibold text-base"
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable onPress={() => onRenameClick(modalText)}>
                <Text
                  style={{
                    color:
                      modalText.trim() &&
                      modalText.trim() !== defaultName.trim()
                        ? COLORS.main + "dd"
                        : COLORS.main + "77",
                  }}
                  className="font-primary_semibold text-base"
                >
                  Rename
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RenameModal;
