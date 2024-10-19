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
import TrackPlayer from "react-native-track-player";

interface TPlaylistNameMenuProps {
  playlistName: string;
}

const PlaylistNameMenu = ({ playlistName }: TPlaylistNameMenuProps) => {
  const renamePlaylist = useZustandStore((state) => state.renamePlaylist);
  const removePlaylist = useZustandStore((state) => state.removePlaylist);
  const setCurrentQueue = useZustandStore((state) => state.setCurrentQueue);
  const setIsTrackPlaying = useZustandStore((state) => state.setIsTrackPlaying);
  const setCurrentMusicTrack = useZustandStore(
    (state) => state.setCurrentMusicTrack,
  );

  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onPlayOptionClick = async () => {
    const playlistMusicFiles =
      useZustandStore
        .getState()
        .allPlaylists.find((playlist) => playlist.name === playlistName)
        ?.musicTracks || [];

    if (!playlistMusicFiles.length) return;

    await TrackPlayer.reset();
    await TrackPlayer.add(playlistMusicFiles);

    setCurrentQueue({
      type: "playlist",
      name: playlistName,
      tracksCount: playlistMusicFiles.length,
    });

    await TrackPlayer.skip(0);
    await TrackPlayer.play();

    setIsTrackPlaying(true);

    setCurrentMusicTrack(playlistMusicFiles[0]);
  };

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
              backgroundColor: COLORS.primaryIcon,
              borderRadius: 6,
            },
          }}
        >
          <MenuOption
            children={
              <View className="flex flex-row items-center gap-1 px-1">
                <Play color={COLORS.secondaryText} size={20} />
                <Text className="text-base text-secondaryText">Play</Text>
              </View>
            }
            onSelect={onPlayOptionClick}
          />
          <MenuOption
            children={
              <View className="flex flex-row items-center gap-1 px-1">
                <PenLine color={COLORS.secondaryText} size={20} />
                <Text className="text-base text-secondaryText">Rename</Text>
              </View>
            }
            onSelect={() => {
              setRenameModalVisible(true);
            }}
          />
          <MenuOption
            children={
              <View className="flex flex-row items-center gap-1 px-1">
                <Trash color={COLORS.secondaryText} size={20} />
                <Text className="text-base text-secondaryText">Delete</Text>
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
