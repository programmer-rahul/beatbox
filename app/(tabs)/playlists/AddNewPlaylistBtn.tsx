import CustomText from "@/components/reusable/CustomText";
import { COLORS } from "@/constants/COLORS";
import useMusicStore from "@/store/useMusicStore";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Alert } from "rn-custom-alert-prompt";
import { ToastAndroid } from "react-native";

function AddNewPlaylistBtn() {
  const addNewUserPlaylist = useMusicStore((state) => state.addNewUserPlaylist);

  const onBtnPress = async () => {
    const newPlaylistText = await Alert.prompt({
      title: "New Playlist",
      description: "Please enter a playlist name",
      placeholder: "Enter Playlist Name ...",
    });

    if (newPlaylistText === undefined) return;

    if (newPlaylistText.trim() === "") {
      return ToastAndroid.show(
        "Playlist name should not be empty",
        ToastAndroid.SHORT,
      );
    }

    const isPlaylistAdded = addNewUserPlaylist(newPlaylistText, []);
    if (!isPlaylistAdded) {
      ToastAndroid.show(
        "Playlist with this name already exists",
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <Pressable
      className="my-4 flex w-full flex-row items-center gap-2 rounded-md border-2 px-3 py-1"
      style={{
        borderColor: COLORS.MAIN + "aa",
        backgroundColor: COLORS.MAIN + "77",
      }}
      onPress={onBtnPress}
    >
      <AntDesign name="plus" size={25} color={COLORS.PRIMARY_ICON} />
      <CustomText color="PRIMARY_TEXT">New Playlist</CustomText>
    </Pressable>
  );
}

export default AddNewPlaylistBtn;
