import { ListPlus } from "lucide-react-native";
import COLORS from "./../../../constants/colors";
import { useState } from "react";
import AddTrackInPlaylistModal from "../modal/add-track-in-playlist-modal";

function AddMusicToPlaylistIcon({ size = 25 }: { size?: number }) {
  const [playlistModal, setPlaylistModal] = useState(false);
  return (
    <>
      <AddTrackInPlaylistModal
        isVisible={playlistModal}
        setIsVisible={setPlaylistModal}
      />
      <ListPlus
        size={size}
        color={COLORS.secondaryIcon}
        onPress={() => setPlaylistModal(true)}
      />
    </>
  );
}

export default AddMusicToPlaylistIcon;
