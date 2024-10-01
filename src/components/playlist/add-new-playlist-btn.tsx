import COLORS from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text } from "react-native";

function AddNewPlaylistBtn({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Pressable
      onPress={() => setIsVisible(true)}
      className="my-4 flex flex-row items-center space-x-2 rounded-md border px-4 py-1"
      style={{ borderColor: COLORS.secondaryText }}
    >
      <Entypo name="plus" size={30} color={COLORS.main} />
      <Text
        style={{ color: COLORS.main }}
        className="font-primary_semibold text-xl"
      >
        New Playlist
      </Text>
    </Pressable>
  );
}

export default AddNewPlaylistBtn;
