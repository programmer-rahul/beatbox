import { View, Text } from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
} from "react-native-popup-menu";
import { EllipsisVertical, PenLine, Play, Trash } from "lucide-react-native";
import COLORS from "../../../constants/colors";
import { useState } from "react";
import useZustandStore from "../../../store/useZustandStore";
import DeleteModal from "../modal/delete-modal";
import RenameModal from "../modal/rename-modal";

interface TPlaylistNameMenuProps {
  playlistName: string;
}

const PlaylistNameMenu = ({ playlistName }: TPlaylistNameMenuProps) => {
  const renamePlaylist = useZustandStore((state) => state.renamePlaylist);
  const removePlaylist = useZustandStore((state) => state.removePlaylist);

  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onRename = (newName: string) => {
    if (playlistName.trim() === newName.trim()) return;
    renamePlaylist(playlistName, newName);
  };
  const onDelete = () => {
    removePlaylist(playlistName);
  };

  return (
    <>
      <Menu>
        <MenuTrigger>
          <EllipsisVertical color={COLORS.secondaryIcon} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: COLORS.primaryBg,
              borderRadius: 8,
            },
          }}
        >
          <MenuOption
            children={
              <View className="flex flex-row items-center gap-1">
                <Play color={COLORS.secondaryBg} size={20} />
                <Text className="text-base">Play</Text>
              </View>
            }
            onSelect={() => {
              console.log("on play");
            }}
          />
          <MenuOption
            children={
              <View className="flex flex-row items-center gap-1">
                <PenLine color={COLORS.secondaryBg} size={20} />
                <Text className="text-base">Rename</Text>
              </View>
            }
            onSelect={() => {
              setRenameModalVisible(true);
            }}
          />
          <MenuOption
            children={
              <View className="flex flex-row items-center gap-1">
                <Trash color={COLORS.secondaryBg} size={20} />
                <Text className="text-base">Delete</Text>
              </View>
            }
            onSelect={() => {
              setDeleteModalVisible(true);
            }}
          />
        </MenuOptions>
      </Menu>

      {renameModalVisible && (
        <RenameModal
          isVisible={renameModalVisible}
          setIsVisible={setRenameModalVisible}
          onRenameClick={onRename}
          defaultName={playlistName}
        />
      )}

      {deleteModalVisible && (
        <DeleteModal
          isVisible={deleteModalVisible}
          setIsVisible={setDeleteModalVisible}
          onDeleteClick={onDelete}
        />
      )}
    </>
  );
};

export default PlaylistNameMenu;
