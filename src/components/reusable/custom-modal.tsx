import COLORS from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";

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
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        className="absolute bottom-1/2 left-[10%] h-[17%] w-4/5 rounded-md p-2"
        style={{ backgroundColor: COLORS.secondaryBg }}
      >
        <View className="flex-row items-center justify-between pb-2">
          <Text className="font-primary_semibold text-xl">New Playlist</Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <MaterialIcons name="close" color={COLORS.primaryBg} size={22} />
          </Pressable>
        </View>
        <View className="w-full flex-1 justify-around space-y-2">
          <TextInput
            placeholder="Playlist name here..."
            className="rounded-sm border border-secondaryText px-2"
            value={modalText}
            onChangeText={setModalText}
          />
          <View>
            <Pressable
              className="flex-row items-center justify-center self-end rounded-sm bg-main px-2"
              onPress={onPress}
            >
              <Text
                style={{ color: COLORS.primaryText }}
                className="font-primary_semibold text-base"
              >
                Create
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;
