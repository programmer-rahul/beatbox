import { COLORS } from "@/constants/COLORS";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddNewPlaylistModal from "../screens/playlist/AddNewPlaylistModal";
import useMusicStore from "@/store/useMusicStore";

function AddMusicInPlaylistIcon({ size = 25 }: { size?: number }) {
  const openBottomSheet = useMusicStore((state) => state.openBottomSheet);

  const onPlaylistAddPress = async () => {
    openBottomSheet("ADD_MUSIC_IN_PLAYLIST");
  };

  return (
    <>
      <MaterialIcons
        name="playlist-add"
        size={size}
        color={COLORS.SECONDARY_ICON}
        onPress={onPlaylistAddPress}
      />
      <AddNewPlaylistModal />
    </>
  );
}

export default AddMusicInPlaylistIcon;
