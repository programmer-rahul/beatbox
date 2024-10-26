import COLORS from "../../../constants/colors";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import useZustandStore from "../../../store/useZustandStore";

interface TAddNewPlaylistModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

function AddNewPlaylistModal({
  isVisible,
  setIsVisible,
}: TAddNewPlaylistModalProps) {
  const addPlaylist = useZustandStore((state) => state.addPlaylist);

  const [modalText, setModalText] = useState("");

  const onNewPlaylistPress = () => {
    // check if there are playlist with this name is already exists
    const isPlaylistAlreadyAvailable = useZustandStore
      .getState()
      .allPlaylists.some((playlist) => playlist.name === modalText.trim());

    if (isPlaylistAlreadyAvailable) return;

    // add into playlists
    addPlaylist({
      name: modalText.trim(),
      musicTracksCount: 0,
      musicTracks: [],
    });
    setIsVisible(false);
    setModalText("");
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
              New Playlist
            </Text>
          </View>
          <View className="w-full flex-1 justify-around space-y-2">
            <Text
              className="font-primary_regular text-base"
              style={{ color: COLORS.secondaryText }}
            >
              Please enter a playlist name
            </Text>
            <TextInput
              className="rounded-sm border-b border-b-main py-1 text-black"
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
              <Pressable onPress={onNewPlaylistPress}>
                <Text
                  style={{
                    color: modalText.trim()
                      ? COLORS.main + "dd"
                      : COLORS.main + "77",
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

export default AddNewPlaylistModal;
