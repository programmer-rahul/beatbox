import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { COLORS } from "@/constants/COLORS";
import CustomView from "@/components/reusable/CustomView";
import CustomText from "@/components/reusable/CustomText";
import useMusicStore from "@/store/useMusicStore";
import { ToastAndroid } from "react-native";
import { Alert } from "rn-custom-alert-prompt";

export default function PlaylistItemMenuPopUp({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  const removeUserPlaylist = useMusicStore((state) => state.removeUserPlaylist);
  const renameUserPlaylist = useMusicStore((state) => state.renameUserPlaylist);

  const onPlayPress = () => {
    if (count == 0) return;
  };

  const onRenamePress = async () => {
    const newPlaylistText = await Alert.prompt({
      title: "Rename Playlist",
      description: "Please enter a new name",
      placeholder: "Enter Playlist Name ...",
    });
    if (newPlaylistText === undefined) return;

    if (newPlaylistText.trim() === "") {
      return ToastAndroid.show(
        "Playlist name should not be empty",
        ToastAndroid.SHORT,
      );
    }

    const isPlaylistRenamed = renameUserPlaylist(name, newPlaylistText.trim());
    if (!isPlaylistRenamed) {
      ToastAndroid.show(
        "Playlist with this name already exists",
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show("Playlist renamed successfully!", ToastAndroid.SHORT);
    }
  };

  const onDeletePress = () => {
    removeUserPlaylist(name);
    ToastAndroid.show("Playlist deleted", ToastAndroid.SHORT);
  };

  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcons name="dots-vertical" size={20} color="white" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: COLORS.POPUP_BG,
            borderRadius: 6,
          },
        }}
      >
        <MenuOption
          disabled={count == 0}
          children={
            <CustomView className="flex flex-row items-center gap-1 px-1 pl-0">
              <MaterialCommunityIcons
                name="play"
                size={24}
                color={COLORS.PRIMARY_BG}
              />
              <CustomText color="PRIMARY_BG" fontWeight="Semibold">
                Play
              </CustomText>
            </CustomView>
          }
          onSelect={onPlayPress}
        />
        <MenuOption
          children={
            <CustomView className="flex flex-row items-center gap-1 px-1">
              <MaterialCommunityIcons
                name="pencil"
                size={18}
                color={COLORS.PRIMARY_BG}
              />
              <CustomText color="PRIMARY_BG" fontWeight="Semibold">
                Rename
              </CustomText>
            </CustomView>
          }
          onSelect={onRenamePress}
        />
        <MenuOption
          children={
            <CustomView className="flex flex-row items-center gap-1 px-1">
              <MaterialCommunityIcons
                name="trash-can"
                size={20}
                color={COLORS.PRIMARY_BG}
              />
              <CustomText color="PRIMARY_BG" fontWeight="Semibold">
                Delete
              </CustomText>
            </CustomView>
          }
          onSelect={onDeletePress}
        />
      </MenuOptions>
    </Menu>
  );
}
